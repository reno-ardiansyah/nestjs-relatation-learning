import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsDateString()
  dob?: string; // ISO date string

  @IsOptional()
  @IsString()
  idCardNumber?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  hobbies!: number[]; // array of hobby IDs
}
