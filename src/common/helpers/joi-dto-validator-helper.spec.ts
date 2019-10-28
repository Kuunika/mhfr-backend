import { Test, TestingModule } from '@nestjs/testing';
import { JoiDtoValidatorHelper } from './joi-dto-validator-helper';

describe('JoiDtoValidatorHelper', () => {
  let provider: JoiDtoValidatorHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoiDtoValidatorHelper],
    }).compile();

    provider = module.get<JoiDtoValidatorHelper>(JoiDtoValidatorHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
