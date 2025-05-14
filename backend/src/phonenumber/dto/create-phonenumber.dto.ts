import { IsInt, IsString } from 'class-validator';

export class CreatePhonenumberDto {
  @IsString()
  number!: string;

  @IsInt()
  people_id!: number;
}
