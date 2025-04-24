import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHobbieDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
