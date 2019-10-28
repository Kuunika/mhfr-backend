import { Test, TestingModule } from '@nestjs/testing';
import { DtoIdsValidatorHelper } from './dto-ids-validator-helper';

describe('DtoIdsValidatorHelper', () => {
  let provider: DtoIdsValidatorHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DtoIdsValidatorHelper],
    }).compile();

    provider = module.get<DtoIdsValidatorHelper>(DtoIdsValidatorHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
