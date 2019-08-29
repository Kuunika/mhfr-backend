import { Module } from '@nestjs/common';
import { FacilityBasicDetailsController } from './facility-basic-details.controller';
import { FacilityBasicDetailsService } from './facility-basic-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Districts } from '../common/entities/districts.entity';
import { Facility_Types } from '../common/entities/facility_types.entity';
import { Owners } from '../common/entities/owners.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Facilities, Regulatory_Status, Operational_Status, Districts, Facility_Types, Owners])],
    controllers: [FacilityBasicDetailsController],
    providers: [FacilityBasicDetailsService],
})
export class FacilityBasicDetailsModule {}
