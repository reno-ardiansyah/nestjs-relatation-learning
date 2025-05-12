import { Module } from '@nestjs/common';
import { PhonenumberService } from './phonenumber.service';
import { PhonenumberController } from './phonenumber.controller';

@Module({
  controllers: [PhonenumberController],
  providers: [PhonenumberService],
})
export class PhonenumberModule {}
