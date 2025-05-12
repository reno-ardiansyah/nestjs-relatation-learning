import { Injectable } from '@nestjs/common';
import { CreatePhonenumberDto } from './dto/create-phonenumber.dto';
import { UpdatePhonenumberDto } from './dto/update-phonenumber.dto';

@Injectable()
export class PhonenumberService {
  create(createPhonenumberDto: CreatePhonenumberDto) {
    return 'This action adds a new phonenumber';
  }

  findAll() {
    return `This action returns all phonenumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phonenumber`;
  }

  update(id: number, updatePhonenumberDto: UpdatePhonenumberDto) {
    return `This action updates a #${id} phonenumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} phonenumber`;
  }
}
