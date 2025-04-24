import { PartialType } from '@nestjs/mapped-types';
import { CreateHobbieDto } from './create-hobbie.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateHobbieDto extends PartialType(CreateHobbieDto) {}
