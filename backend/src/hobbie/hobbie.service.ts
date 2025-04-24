import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHobbieDto } from './dto/create-hobbie.dto';
import { UpdateHobbieDto } from './dto/update-hobbie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JsonResponse } from 'src/common/helpers/json.response';

@Injectable()
export class HobbieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHobbieDto: CreateHobbieDto) {
    const result = await this.prisma.hobbies.create({
      data: createHobbieDto,
    });
    return JsonResponse.success(result, 'Create Hobbie Successfully');
  }

  async findAll() {
    const result = await this.prisma.hobbies.findMany();
    return JsonResponse.success(result, 'Fetch Hobbies Successfully');
  }

  async findOne(id: number) {
    const result = await this.prisma.hobbies.findUniqueOrThrow({
      where: { id },
    });
    if (!result) throw new NotFoundException('Hobbies Not Found');
    return JsonResponse.success(result, 'Fetch Hobbie Successfully');
  }

  async update(id: number, updateHobbieDto: UpdateHobbieDto) {
    return await this.prisma.hobbies.update({
      where: { id },
      data: updateHobbieDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.hobbies.delete({
      where: { id },
    });
  }
}
