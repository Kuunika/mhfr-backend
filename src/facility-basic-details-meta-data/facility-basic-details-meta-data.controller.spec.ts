import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBasicDetailsMetaDataController } from './facility-basic-details-meta-data.controller';

describe('FacilityBasicDetailsMetaData Controller', () => {
  let controller: FacilityBasicDetailsMetaDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityBasicDetailsMetaDataController],
    }).compile();

    controller = module.get<FacilityBasicDetailsMetaDataController>(FacilityBasicDetailsMetaDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
