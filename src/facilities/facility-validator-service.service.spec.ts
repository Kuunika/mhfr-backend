import { Test, TestingModule } from '@nestjs/testing';
import { FacilityValidatorServiceService } from './facility-validator-service.service';

describe('FacilityValidatorServiceService', () => {
  let service: FacilityValidatorServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityValidatorServiceService],
    }).compile();

    service = module.get<FacilityValidatorServiceService>(FacilityValidatorServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
