import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../../common/entities/facilities.entity';
import { FacilityContactDto} from '../dtos/facility-contact.dto';
import { Repository } from 'typeorm';
import { FacilityContactCreateService } from './facility-contact-create/facility-contact-create.service';
import { SuccessCreatedFacilityContactDto } from '../dtos/success-created-facility-contact.dto';


@Injectable()
export class FacilityContactsService {

    constructor(@InjectRepository(Facilities) private readonly facilityRepository: Repository<Facilities>,
                private readonly facilityContactCreateService: FacilityContactCreateService) {}

    async createFacilityContactDetails(facility_code: string, facilityContact: CreateFacilityContactDto): Promise<SuccessCreatedFacilityContactDto> {
        return await this.facilityContactCreateService.createFacilityContactDetails(facility_code, facilityContact);
    }

    async getFacilityContactDetails(facility_code: string): Promise<FacilityContactDto> {
        const facility = await this.facilityRepository.findOne
        ({facility_code}, {relations: ['contact_people', 'location', 'facility_operational_status', 'geolocation', 'address', 'district']});

        return {
            contactDetails: {
                catchmentArea: facility.location.catchment_area,
                catchmentPopulation: facility.location.catchment_population,
                contactEmail: facility.contact_people.contact_person_email,
                contactPerson: facility.contact_people.contact_person_fullname,
                contactPhone: facility.contact_people.contact_person_phone,
                latitude: parseFloat(`${facility.geolocation.latitude}`),
                longitude: parseFloat(`${facility.geolocation.longitude}`),
                postalAddress: facility.address.postal_address,
            },
            summary: {
                district: facility.district.district_name,
                commonName: facility.common_name,
                lastUpdated: facility.updated_at.toDateString(),
                name: facility.facility_name,
                // TODO: This should either return the code map or null
                oldMOHCode: null,
                operationalStatus: facility.facility_operational_status.facility_operational_status,
            },
        };

    }

}
