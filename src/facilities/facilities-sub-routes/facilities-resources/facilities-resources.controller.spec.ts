import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesResourcesController } from './facilities-resources.controller';

describe('FacilitiesResources Controller', () => {
  let controller: FacilitiesResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitiesResourcesController],
    }).compile();

    controller = module.get<FacilitiesResourcesController>(FacilitiesResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
