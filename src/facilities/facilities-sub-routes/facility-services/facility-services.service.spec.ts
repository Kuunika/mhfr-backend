import { Test, TestingModule } from '@nestjs/testing';
import { FacilityServicesService } from './facility-services.service';

describe('FacilityServicesService', () => {
  let service: FacilityServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityServicesService],
    }).compile();

    service = module.get<FacilityServicesService>(FacilityServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
