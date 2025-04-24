import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HobbieService } from './hobbie.service';
import { CreateHobbieDto } from './dto/create-hobbie.dto';
import { UpdateHobbieDto } from './dto/update-hobbie.dto';

@Controller('hobbie')
export class HobbieController {
  constructor(private readonly hobbieService: HobbieService) {}

  @Post()
  create(@Body() createHobbieDto: CreateHobbieDto) {
    return this.hobbieService.create(createHobbieDto);
  }

  @Get()
  findAll() {
    return this.hobbieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbieDto: UpdateHobbieDto) {
    return this.hobbieService.update(+id, updateHobbieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbieService.remove(+id);
  }
}
