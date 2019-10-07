import { Test, TestingModule } from '@nestjs/testing';
import { FacilityCodeService } from './facility-code.service';

describe('FacilityCodeService', () => {
  let service: FacilityCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityCodeService],
    }).compile();

    service = module.get<FacilityCodeService>(FacilityCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
