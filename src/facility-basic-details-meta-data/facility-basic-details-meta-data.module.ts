import { Module } from '@nestjs/common';
import { FacilityBasicDetailsMetaDataController } from './facility-basic-details-meta-data.controller';
import { FacilityBasicDetailsMetaDataService } from './facility-basic-details-meta-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Districts } from '../common/entities/districts.entity';
import { Facility_Types } from '../common/entities/facility_types.entity';
import { Owners } from '../common/entities/owners.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Regulatory_Status, Operational_Status, Districts, Facility_Types, Owners])],
  controllers: [FacilityBasicDetailsMetaDataController],
  providers: [FacilityBasicDetailsMetaDataService]
})
export class FacilityBasicDetailsMetaDataModule {}
