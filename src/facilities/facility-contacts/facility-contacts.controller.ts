import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FacilityContactDto } from '../dtos/facility-contact.dto';
import { CreateFacilityContactDto } from '../dtos/create-facility-contact.dto';
import { SuccessCreatedFacilityContactDto} from '../dtos/success-created-facility-contact.dto';
import { FacilityContactsService } from './facility-contacts.service';

@Controller('facilities/:facility_code/contacts')
export class FacilityContactsController {
    constructor(private readonly facilityContactService: FacilityContactsService) {}

    @Get()
    async getFacilityContactDetails(@Param('facility_code') facility_code: string): Promise<FacilityContactDto> {
        return this.facilityContactService.getFacilityContactDetails(facility_code);
    }

    @Post()
    async createFacilityContactDetails(@Param('facility_code') facility_code: string,
                                       @Body() createFacilityContactDto: CreateFacilityContactDto): Promise<SuccessCreatedFacilityContactDto> {

        return await this.facilityContactService.createFacilityContactDetails(facility_code, createFacilityContactDto);

    }
}
