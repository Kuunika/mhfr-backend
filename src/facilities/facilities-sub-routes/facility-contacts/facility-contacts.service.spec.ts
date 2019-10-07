import { Test, TestingModule } from '@nestjs/testing';
import { FacilityContactsService } from './facility-contacts.service';

describe('FacilityContactsService', () => {
  let service: FacilityContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityContactsService],
    }).compile();

    service = module.get<FacilityContactsService>(FacilityContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
