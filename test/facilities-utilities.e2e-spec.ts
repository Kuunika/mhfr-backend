import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as facilitiesUtilitiesGet from './hapijoi-test-schemas/facility-utilities-schemas/facilities-utilities-get.schema';

describe('FacilitiesUtilitiesController (e2e)', () => {
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

  describe('Facilities Utilities /GET', () => {

    it('Should return an array of type GetFacilitiesUtilitiesDto', () => {
        return request(app.getHttpServer())
        .get('/facilities/CK270193/utilities')
        .expect(200)
        .responseType('GetFacilitiesUtilitiesDto');
      });

    it('Should return data with valid ranges', () => {
        return request(app.getHttpServer())
        .get('/facilities/CK270193/utilities')
        .expect(200)
        .expect((response) => {
            const errorMessage = Joi.validate(response.body, facilitiesUtilitiesGet.default).error;
            expect(errorMessage).toBeNull();
        });
    });

  });
});
