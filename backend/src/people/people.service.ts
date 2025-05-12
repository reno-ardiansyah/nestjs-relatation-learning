import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.prisma.peoples.create({
      data: {
        name: createPersonDto.name,
        dob: createPersonDto.dob ? new Date(createPersonDto.dob) : null,
        // nested IdCard
        ...(createPersonDto.idCardNumber && {
          IdCard: { create: { number: createPersonDto.idCardNumber } },
        }),
        // nested hobbies relations
        ...(createPersonDto.hobbies &&
          createPersonDto.hobbies.length > 0 && {
            hobbies: {
              create: createPersonDto.hobbies.map((hobbieId) => ({
                hobbie_id: hobbieId,
              })),
            },
          }),
      },
      include: {
        PhoneNumbers: true,
        IdCard: true,
        hobbies: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.peoples.findMany({
      include: {
        PhoneNumbers: true,
        IdCard: true,
        hobbies: {
          include: { hobbie: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const person = await this.prisma.peoples.findUnique({
      where: { id },
      include: {
        PhoneNumbers: true,
        IdCard: true,
        hobbies: {
          include: { hobbie: true },
        },
      },
    });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id);
    return await this.prisma.peoples.update({
      where: { id },
      data: {
        name: updatePersonDto.name,
        dob: updatePersonDto.dob ? new Date(updatePersonDto.dob) : undefined,
      },
      include: {
        PhoneNumbers: true,
        IdCard: true,
        hobbies: { include: { hobbie: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.peoples.delete({ where: { id } });
  }
}
