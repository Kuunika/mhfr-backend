import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { FacilityContactDto} from '../../dtos/facility-contact.dto';
import { Repository } from 'typeorm';
import { FacilityContactCreateService } from './facility-contact-create/facility-contact-create.service';
import { SuccessCreatedFacilityContactDto } from '../../dtos/success-created-facility-contact.dto';
import { CreateFacilityContactDto } from '../../dtos/create-facility-contact.dto';

@Injectable()
export class FacilityContactsService {

    constructor(@InjectRepository(Facilities) private readonly facilityRepository: Repository<Facilities>,
                private readonly facilityContactCreateService: FacilityContactCreateService) {}

    async createFacilityContactDetails(facility_code: string, facilityContact: CreateFacilityContactDto): Promise<SuccessCreatedFacilityContactDto> {
        return await this.facilityContactCreateService.createFacilityContactDetails(facility_code, facilityContact);
    }

    // TODO: Create a helper to handle the old MOH Codes.
    async getFacilityContactDetails(facility_code: string): Promise<FacilityContactDto> {
        const facility = await this.facilityRepository.findOne
        ({facility_code}, {relations: ['contact_people', 'location', 'facility_operational_status', 'geolocation', 'address', 'district']});
        if (facility.location === null) {
             throw new HttpException('Contact Details Do Not Yet Exist on this Facility, Please create', HttpStatus.NOT_FOUND)
            }
        return {
            contactDetails: {
                catchmentArea: facility.location.catchment_area ? facility.location.catchment_area : null,
                catchmentPopulation: facility.location.catchment_population ? facility.location.catchment_population : null,
                contactEmail: facility.contact_people.contact_person_email ? facility.contact_people.contact_person_email : null,
                contactPerson: facility.contact_people.contact_person_fullname ? facility.contact_people.contact_person_fullname : null,
                contactPhone: facility.contact_people.contact_person_phone ? facility.contact_people.contact_person_phone : null,
                latitude: parseFloat(`${facility.geolocation.latitude}`) ?  parseFloat(`${facility.geolocation.latitude}`) : null,
                longitude: parseFloat(`${facility.geolocation.longitude}`) ? parseFloat(`${facility.geolocation.longitude}`) : null,
                postalAddress: facility.address.postal_address ? facility.address.postal_address : null,
            },
            summary: {
                district: facility.district.district_name,
                commonName: facility.common_name,
                lastUpdated: facility.updated_at,
                name: facility.facility_name,
                oldMOHCode: 'kdoinin',
                operationalStatus: facility.facility_operational_status.facility_operational_status,
            },
        };

    }

}
