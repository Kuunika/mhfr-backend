import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FacilityBasicDetailsDto } from 'src/facility-basic-details/dtos/facility-basic-details.dto';

describe('Facilities Basic Details Controller (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/Get', () => {
      it('facilities-basic-details /GET', () => {
          return request(app.getHttpServer())
          .get('/facility-basic-details/ac010001')
          .expect(200)
          .responseType('FacilityBasicDetailsDto');
      });
  });

});
