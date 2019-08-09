import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {FrontEndRetrieveAllFacilitiesDto} from './../src/facilities/dtos/front-end-retrieve-all-facilities.dto';
import * as Joi from '@hapi/joi';
import * as facilitiesGet from './../test/hapijoi-test-schemas/facilities-get.schema';

describe('FacilitiesController (e2e)', () => {
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

  describe('facilities /GET', () => {

    it('Should return an array of type FrontEndRetrieveAllFacilitiesDto', () => {
        return request(app.getHttpServer())
        .get('/facilities')
        .expect(200)
        .responseType(typeof (Array<FrontEndRetrieveAllFacilitiesDto>()));
      });

    it('Should return data with valid ranges', () => {
        return request(app.getHttpServer())
        .get('/facilities')
        .expect((res) => {
            for (const facility of res.body) {
                const errorMessage = Joi.validate(facility, facilitiesGet.default).error;
                expect(errorMessage).toBeNull();
            }
 
        });
      });
  });

});
