import { Test, TestingModule } from '@nestjs/testing';
import { FacilityContactsController } from './facility-contacts.controller';

describe('FacilityContacts Controller', () => {
  let controller: FacilityContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityContactsController],
    }).compile();

    controller = module.get<FacilityContactsController>(FacilityContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
