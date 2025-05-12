import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbieModule } from './hobbie/hobbie.module';
import { PrismaModule } from './prisma/prisma.module';
import { PeopleModule } from './people/people.module';
import { PhonenumberModule } from './phonenumber/phonenumber.module';

@Module({
  imports: [HobbieModule, PrismaModule, PeopleModule, PhonenumberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
