import { Test, TestingModule } from '@nestjs/testing';
import { FacilityContactCreateService } from './facility-contact-create.service';

describe('FacilityContactCreateService', () => {
  let service: FacilityContactCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityContactCreateService],
    }).compile();

    service = module.get<FacilityContactCreateService>(FacilityContactCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
