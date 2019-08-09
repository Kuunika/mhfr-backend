import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesDashboardController } from './facilities-dashboard.controller';

describe('FacilitiesDashboard Controller', () => {
  let controller: FacilitiesDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitiesDashboardController],
    }).compile();

    controller = module.get<FacilitiesDashboardController>(FacilitiesDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
