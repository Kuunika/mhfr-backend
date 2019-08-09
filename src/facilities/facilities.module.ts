import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { FacilitiesDashboardController } from './facilities-dashboard/facilities-dashboard.controller';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Districts } from '../common/entities/districts.entity';
import { Facility_Types } from '../common/entities/facility_types.entity';
import { Owners } from '../common/entities/owners.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Regulatory_Status, Operational_Status, Districts, Facility_Types, Owners])],
  providers: [FacilitiesService],
  controllers: [FacilitiesController, FacilitiesDashboardController],
})
export class FacilitiesModule {}
