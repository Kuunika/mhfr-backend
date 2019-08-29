import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FacilityContactDto } from '../src/facilities/dtos/facility-contact.dto';
import { SuccessCreatedFacilityContactDto } from '../src/facilities/dtos/success-created-facility-contact.dto';
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

  describe('/GET', () => {
      it('/facilities/{facility-code}/contacts should return a facility', () => {
          return request(app.getHttpServer())
          .get('/facilities/sesd/contacts')
          .expect(200)
          .responseType('FacilityContactDto');
      });
  });

  describe('/POST', () => {
    it('/facilities/{facility-code}/contacts should create new facility', () => {
        return request(app.getHttpServer())
        .post('/facilities/sesd/contacts')
        .send({
            "contactPerson":       "Brett Onions",
            "contactEmail":        "brettonions@gmail.com",
            "contactPhone":        "995311396",
            "catchmentArea":       "rural",
            "catchmentPopulation": 2000,
            "latitude":            -12.9,
            "longitude":           -13.11,
            "physicalAddress":		 "123 Marry Lane",
            "postalAddress":       "P.O. Box 7589 Blantyre"
        })
        .expect(201)
        .responseType('SuccessCreatedFacilityContactDto');
    });
  });

});