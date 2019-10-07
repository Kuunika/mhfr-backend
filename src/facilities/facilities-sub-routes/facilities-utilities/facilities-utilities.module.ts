import { Module } from '@nestjs/common';
import { FacilitiesUtilitiesService } from './facilities-utilities.service';
import { FacilitiesUtilitiesController } from './facilities-utilities.controller';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Facility_Utilities } from '../../../common/entities/facility_utilities.entity';
import { Utilities } from '../../../common/entities/utilities.entity';
import { Utility_Type } from '../../../common/entities/utility_types.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Utilities, Utility_Type, Facility_Utilities])],
  providers: [FacilitiesUtilitiesService, FacilitiesSummaryHelper, FacilityValidatorServiceService],
  controllers: [FacilitiesUtilitiesController]
})
export class FacilitiesUtilitiesModule {}
