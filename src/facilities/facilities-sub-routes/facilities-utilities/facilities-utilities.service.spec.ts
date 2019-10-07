import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesUtilitiesService } from './facilities-utilities.service';

describe('FacilitiesUtilitiesService', () => {
  let service: FacilitiesUtilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitiesUtilitiesService],
    }).compile();

    service = module.get<FacilitiesUtilitiesService>(FacilitiesUtilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
