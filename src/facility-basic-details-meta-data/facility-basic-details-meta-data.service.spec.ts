import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBasicDetailsMetaDataService } from './facility-basic-details-meta-data.service';

describe('FacilityBasicDetailsMetaDataService', () => {
  let service: FacilityBasicDetailsMetaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityBasicDetailsMetaDataService],
    }).compile();

    service = module.get<FacilityBasicDetailsMetaDataService>(FacilityBasicDetailsMetaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
