import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBasicDetailsController } from './facility-basic-details.controller';

describe('FacilityBasicDetails Controller', () => {
  let controller: FacilityBasicDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityBasicDetailsController],
    }).compile();

    controller = module.get<FacilityBasicDetailsController>(FacilityBasicDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
