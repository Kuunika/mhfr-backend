import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as facilitiesServicesDtoSchema from './hapijoi-test-schemas/facility-services-schemas/facility-services-get.schema';
import * as _ from 'lodash';

const testDataFromJSON = require('./test-data/facility-services-test-data/facility-services.get.json');
const facilitiesServicesTestData = testDataFromJSON.map((testData): any[] => {
  return [testData.facilityCode, testData.expectedResult];
});

describe('Facilities Services Controller (e2e)', () => {
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
      it('Getting all of the services from a specific location', () => {
          return request(app.getHttpServer())
          .get('/facilities/MC010001/services')
          .expect(200)
          .responseType('FacilitiesServicesDto');
      });

      it('Getting all of the services from a specific location', () => {
        return request(app.getHttpServer())
        .get('/facilities/MC010001/services')
        .expect((res) => {
              const errorMessage = Joi.validate(res.body, facilitiesServicesDtoSchema.default).error;
              // tslint:disable-next-line: no-console
              if (errorMessage) { console.log(errorMessage); }
              expect(errorMessage).toBeNull();

      });
    });

      it.each(facilitiesServicesTestData)('', (facilityCode, expectedResult) => {
      return request(app.getHttpServer())
        .get(`/facilities/${facilityCode}/services`)
        .expect(200)
        .expect((response) => {
          _.isEqual(expectedResult, response);
        });
    });

  });
});
