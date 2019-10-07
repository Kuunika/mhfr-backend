import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesUtilitiesController } from './facilities-utilities.controller';

describe('FacilitiesUtilities Controller', () => {
  let controller: FacilitiesUtilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitiesUtilitiesController],
    }).compile();

    controller = module.get<FacilitiesUtilitiesController>(FacilitiesUtilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
