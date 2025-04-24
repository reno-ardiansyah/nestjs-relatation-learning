import { Module } from '@nestjs/common';
import { HobbieService } from './hobbie.service';
import { HobbieController } from './hobbie.controller';

@Module({
  controllers: [HobbieController],
  providers: [HobbieService],
})
export class HobbieModule {}
