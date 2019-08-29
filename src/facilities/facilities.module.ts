import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Districts } from '../common/entities/districts.entity';
import { Facility_Types } from '../common/entities/facility_types.entity';
import { Owners } from '../common/entities/owners.entity';
import { Locations } from '../common/entities/locations.entity';
import { Contact_People } from '../common/entities/contact_people.entity';
import { Geolocations } from '../common/entities/geolocations.entity';
import { FacilityCodeService } from './facility-code/facility-code.service';
import { FacilityContactsService } from './facility-contacts/facility-contacts.service';
import { FacilityContactsController } from './facility-contacts/facility-contacts.controller';
import { FacilityContactCreateService } from './facility-contacts/facility-contact-create/facility-contact-create.service';


@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Regulatory_Status, Operational_Status, Locations,
                                      Districts, Contact_People, Facility_Types, Owners, Geolocations])],

  providers: [FacilitiesService, FacilityCodeService, FacilityContactsService, FacilityContactCreateService],
  controllers: [FacilitiesController, FacilityContactsController],
})
export class FacilitiesModule {}
