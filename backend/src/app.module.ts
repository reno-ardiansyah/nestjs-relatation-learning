import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbieModule } from './hobbie/hobbie.module';
import { HobbieModule } from './hobbie/hobbie.module';

@Module({
  imports: [HobbieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
