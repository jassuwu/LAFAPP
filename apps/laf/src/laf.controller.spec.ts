import { Test, TestingModule } from '@nestjs/testing';
import { LafController } from './laf.controller';
import { LafService } from './laf.service';

describe('LafController', () => {
  let lafController: LafController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LafController],
      providers: [LafService],
    }).compile();

    lafController = app.get<LafController>(LafController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(lafController.getHello()).toBe('Hello World!');
    });
  });
});
