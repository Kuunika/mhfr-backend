import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesResourcesService } from './facilities-resources.service';

describe('FacilitiesResourcesService', () => {
  let service: FacilitiesResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitiesResourcesService],
    }).compile();

    service = module.get<FacilitiesResourcesService>(FacilitiesResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
