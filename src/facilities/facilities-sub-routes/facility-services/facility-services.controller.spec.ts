import { Test, TestingModule } from '@nestjs/testing';
import { FacilityServicesController } from './facility-services.controller';

describe('FacilityServices Controller', () => {
  let controller: FacilityServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityServicesController],
    }).compile();

    controller = module.get<FacilityServicesController>(FacilityServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
