import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as Joi from '@hapi/joi';
import * as getDashboardDtoSchema from './hapijoi-test-schemas/dashboard-test-schemas/dashboard.schema';


describe('DashboardController (e2e)', () => {
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

  describe('Dashboard /GET', () => {

    it('Should return an array of type DashboardDto', () => {
        return request(app.getHttpServer())
        .get('/dashboards')
        .expect(200)
        .responseType('DashboardDto');
      });

    it('Should return data with valid ranges', () => {
        return request(app.getHttpServer())
        .get('/dashboards')
        .expect(200)
        .expect((res) => {
              const errorMessage = Joi.validate(res.body, getDashboardDtoSchema.default).error;
              // if(errorMessage){ console.log(errorMessage); }
              expect(errorMessage).toBeNull();
        });
    });

  });
});
