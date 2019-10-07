import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as facilitiesResourcesDtoSchema from './hapijoi-test-schemas/facilities-resource-schemas/facilities-resource-get.schema';

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
              // if(errorMessage){ console.log(errorMessage); }
              expect(errorMessage).toBeNull();

      });
    });
  });
});
