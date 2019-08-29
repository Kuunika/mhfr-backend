import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBasicDetailsService } from './facility-basic-details.service';

describe('FacilityBasicDetailsService', () => {
  let service: FacilityBasicDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityBasicDetailsService],
    }).compile();

    service = module.get<FacilityBasicDetailsService>(FacilityBasicDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
