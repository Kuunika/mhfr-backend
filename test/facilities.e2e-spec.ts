import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {GetFacilitiesDto} from '../src/facilities/dtos/get-facilities.dto';
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
        .responseType(typeof (Array<GetFacilitiesDto>()));
      });

      /*
        This test is highly brittle and requires that all of the data in the facilities table be
        filled and valid in order to pass
      */
    it('Should return data with valid ranges', () => {
        return request(app.getHttpServer())
        .get('/facilities')
        .expect((res) => {
            for (const facility of res.body) {
                const errorMessage = Joi.validate(facility, facilitiesGet.default).error;
                
                 if(errorMessage){ console.log(errorMessage); }
                
                expect(errorMessage).toBeNull();
            }

        });
      });

  });

});
