import { Module } from '@nestjs/common';
import { FacilitiesResourcesService } from './facilities-resources.service';
import { FacilitiesResourcesController } from './facilities-resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Facility_Resources } from '../../../common/entities/facility_resources.entity';
import { Resources } from '../../../common/entities/resources.entity';
import { Resource_Type } from '../../../common/entities/resource_type.entity';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { Districts } from '../../../common/entities/districts.entity';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

@Module({
    imports: [TypeOrmModule.forFeature([Facilities, Facility_Resources, Districts, Resources, Resource_Type])],
    providers: [FacilitiesResourcesService, FacilitiesSummaryHelper, FacilityValidatorServiceService],
    controllers: [FacilitiesResourcesController],
})
export class FacilitiesResourcesModule {}
