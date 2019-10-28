import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitiesModule } from './facilities/facilities.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { FacilityBasicDetailsModule } from './facility-basic-details/facility-basic-details.module';
import { FacilityBasicDetailsMetaDataModule } from './facility-basic-details-meta-data/facility-basic-details-meta-data.module';
import { DtoIdsValidatorHelper } from './common/helpers/dto-ids-validator-helper';
require( 'dotenv' ).config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    debug: false,
    dropSchema: false,
}), FacilitiesModule, CustomLoggerModule, DashboardsModule, FacilityBasicDetailsModule, FacilityBasicDetailsMetaDataModule],
  controllers: [AppController],
  providers: [AppService, DtoIdsValidatorHelper],
})
export class AppModule {}
