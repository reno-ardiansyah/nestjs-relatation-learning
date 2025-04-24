import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHobbieDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ApiProperty({
    description: 'Nama hobi',
    example: 'Ngoding sambil ngopi',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name!: string;
}
