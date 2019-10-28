import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as facilitiesUtilitiesGet from './hapijoi-test-schemas/facility-utilities-schemas/facilities-utilities-get.schema';
import * as _ from 'lodash';


describe('FacilitiesUtilitiesController (e2e)', () => {
  let app;

  const testDataJSONFile = require('./test-data/facility-utilities-test-data/facility-utilities.get.json');
  const facilityUtilitiesTestData = testDataJSONFile.map((testData): any[] => {
      return [testData['facilityCode'], testData['expectedResult']];
    });

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

    it.each(facilityUtilitiesTestData)('Should return same results as Facility Utilities Test Data', (facilityCode, expectedResult) => {
      return request(app.getHttpServer())
        .get(`/facilities/${facilityCode}/utilities`)
        .expect(200)
        .expect((response) => {
          _.isEqual(expectedResult, response.body);
        });
    });
  });
});
