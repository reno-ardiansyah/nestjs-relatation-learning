import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbieModule } from './hobbie/hobbie.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HobbieModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
