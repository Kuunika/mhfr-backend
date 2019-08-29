import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Repository } from 'typeorm';
import * as Schema from '../../../common/validation_schemas/create-facility-contact-details.schema';
import * as Joi from '@hapi/joi';
import { CreateFacilityContactDto } from '../../../facilities/dtos/create-facility-contact.dto';
import { SuccessCreatedFacilityContactDto } from '../../../facilities/dtos/success-created-facility-contact.dto';
import { Locations } from '../../../common/entities/locations.entity';
import { Geolocations } from '../../../common/entities/geolocations.entity';
import { Contact_People } from '../../../common/entities/contact_people.entity';
import { Addresses } from '../../../common/entities/addresses.entity';

@Injectable()
export class FacilityContactCreateService {
    constructor(@InjectRepository(Facilities) private readonly facilityRepository: Repository<Facilities>) {}

    async createFacilityContactDetails(facility_code: string, facilityContact: CreateFacilityContactDto): Promise<SuccessCreatedFacilityContactDto> {
        // TODO: Prevent user if a facility already has one of these resources prevent the overwriting of it
        // TODO: Validate that coordinates provided are actually on malawi.
        // TODO: Throw 500 for all other issues pertaining to the request. Find out how to throw http error when database throws an error.

        const facility = await this.facilityRepository.findOne({facility_code}
            , {relations: ['location', 'geolocation', 'address', 'contact_people']});

        if (!facility) {
            throw new HttpException({
                error: 'The facility specified does not exist',
            }, HttpStatus.NOT_FOUND);
        }

        this.validateContactDetails(facilityContact, Schema);

        try {
            this.setFacilityContactDetails(facility, facilityContact);
            await this.facilityRepository.save(facility);
        } catch (error) {
            throw new HttpException({
                error: 'Something went wrong internally, Please try again later',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }

        return {
            message: `Successfully Created Contact Details for ${facility.facility_name}`,
            createdEntity: {
                catchmentArea: facilityContact.catchmentArea,
                contactPerson: facilityContact.contactPerson,
                facilityCode: facility_code,
            },
        };
    }

    private setFacilityContactDetails(facility: Facilities, facilityContact: CreateFacilityContactDto) {
        const location = new Locations();
        const geolocation = new Geolocations();
        const contact_people = new Contact_People();
        const address = new Addresses();

        // Setting up the location information
        location.catchment_area = facilityContact.catchmentArea;
        location.catchment_population = facilityContact.catchmentPopulation;

        // Setting up geolocation information
        geolocation.latitude = facilityContact.latitude;
        geolocation.longitude = facilityContact.longitude;

        // Setting up contact people information
        contact_people.contact_person_email = facilityContact.contactEmail;
        contact_people.contact_person_fullname = facilityContact.contactPerson;
        contact_people.contact_person_phone = facilityContact.contactPhone;

        // Setting up address information
        address.physical_address = facilityContact.physicalAddress;
        address.postal_address = facilityContact.postalAddress;
        // Make suggestion for update due to field missing.
        // address.physical_address = facilityContact.

        facility.address =  address;
        facility.contact_people =  contact_people;
        facility.geolocation =  geolocation;
        facility.location = location;
    }

    validateContactDetails(contactDetails: CreateFacilityContactDto, schema){
        const invalid = Joi.validate(contactDetails, Schema.default);
        if (invalid.error) {
            throw new HttpException(
               {errors: invalid.error.details.map(detail => detail.message)}
            , HttpStatus.BAD_REQUEST);
        }

    }
}
