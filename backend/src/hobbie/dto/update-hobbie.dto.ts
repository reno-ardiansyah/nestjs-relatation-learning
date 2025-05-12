import { PartialType } from '@nestjs/mapped-types';
import { CreateHobbieDto } from './create-hobbie.dto';

export class UpdateHobbieDto extends PartialType(CreateHobbieDto) {}
