import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as facilitiesResourcesDtoSchema from './hapijoi-test-schemas/facilities-resource-schemas/facilities-resource-get.schema';
import * as _ from 'lodash';

const testDataFromJSON = require('./test-data/facility-resouces-test-data/facility-resources.get.json');
const facilitiesResourcesTestData = testDataFromJSON.map((testData): any[] => {
  return [testData.facilityCode, testData.expectedResult];
});

describe('Facilities Resources Controller (e2e)', () => {
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

  describe('/GET', () => {
      it('Getting all of the resources from a specific location', () => {
          return request(app.getHttpServer())
          .get('/facilities/SA090092/resources')
          .expect(200)
          .responseType('FacilitiesResourcesDto');
      });

      it('Getting all of the resources from a specific location', () => {
        return request(app.getHttpServer())
        .get('/facilities/SA090092/resources')
        .expect((res) => {
              const errorMessage = Joi.validate(res.body, facilitiesResourcesDtoSchema.default).error;
              // tslint:disable-next-line: no-console
              if (errorMessage) { console.log(errorMessage); }
              expect(errorMessage).toBeNull();

      });
    });

      it.each(facilitiesResourcesTestData)('', (facilityCode, expectedResult) => {
      return request(app.getHttpServer())
        .get(`/facilities/${facilityCode}/resources`)
        .expect(200)
        .expect((response) => {
          _.isEqual(expectedResult, response);
        });
    });

  });
});
