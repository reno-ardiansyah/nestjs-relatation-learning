import { Test, TestingModule } from '@nestjs/testing';
import { HobbieController } from './hobbie.controller';
import { HobbieService } from './hobbie.service';

describe('HobbieController', () => {
  let controller: HobbieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HobbieController],
      providers: [HobbieService],
    }).compile();

    controller = module.get<HobbieController>(HobbieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
