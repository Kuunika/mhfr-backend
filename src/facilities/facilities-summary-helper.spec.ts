import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesSummaryHelper } from './facilities-summary-helper';

describe('FacilitiesSummaryHelper', () => {
  let provider: FacilitiesSummaryHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitiesSummaryHelper],
    }).compile();

    provider = module.get<FacilitiesSummaryHelper>(FacilitiesSummaryHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
