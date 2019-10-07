import { Module } from '@nestjs/common';
import { FacilityServicesService } from './facility-services.service';
import { FacilityServicesController } from './facility-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Services } from '../../../common/entities/services.entity';
import { Service_Type } from '../../../common/entities/service_types.entity';
import { Facility_Services } from '../../../common/entities/facility_services.entity';
import { Districts } from '../../../common/entities/districts.entity';
import { Operational_Status } from '../../../common/entities/operational_status.entity';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Facility_Services, Services, Service_Type, Districts, Operational_Status])],
  providers: [FacilityServicesService, FacilitiesSummaryHelper, FacilityValidatorServiceService],
  controllers: [FacilityServicesController]
})
export class FacilityServicesModule {}
