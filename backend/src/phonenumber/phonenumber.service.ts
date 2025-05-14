import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhonenumberDto } from './dto/create-phonenumber.dto';
import { UpdatePhonenumberDto } from './dto/update-phonenumber.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhonenumberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPhoneNumberDto: CreatePhonenumberDto) {
    const { number, people_id } = createPhoneNumberDto;

    const person = await this.prisma.peoples.findUnique({
      where: { id: people_id },
    });
    if (!person)
      throw new NotFoundException(`People with ID ${people_id} not found`);

    return await this.prisma.phoneNumbers.create({
      data: {
        number,
        people_id,
      },
      include: {
        people: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.phoneNumbers.findMany({
      include: {
        people: true,
      },
    });
  }

  async findOne(id: number) {
    const phone = await this.prisma.phoneNumbers.findUnique({
      where: { id },
      include: {
        people: true,
      },
    });

    if (!phone) {
      throw new NotFoundException(`Phone number with ID ${id} not found`);
    }

    return phone;
  }

  async update(id: number, updatePhoneNumberDto: UpdatePhonenumberDto) {
    await this.findOne(id);

    return await this.prisma.phoneNumbers.update({
      where: { id },
      data: {
        number: updatePhoneNumberDto.number,
        people_id: updatePhoneNumberDto.people_id,
      },
      include: {
        people: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.phoneNumbers.delete({
      where: { id },
    });
  }
}
