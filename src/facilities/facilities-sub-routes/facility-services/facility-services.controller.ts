import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { GetFacilityServiceDto } from '../../dtos/get-facility-services.dto';
import { CreateFacilityServiceDto } from '../../dtos/create-facility-services.dto';
import { SuccessFacilityServiceCreatedDto } from '../../dtos/success-facility-service-created.dto';
import { FacilityServicesService } from './facility-services.service';

@Controller('facilities/:facility_code/services')
export class FacilityServicesController {
    constructor(private readonly facilityServicesService: FacilityServicesService) {}

    @Get()
    async getFacilityServices(@Param('facility_code') facility_code: string):Promise<GetFacilityServiceDto> {
        return await this.facilityServicesService.getFacilityServices(facility_code);
    }

    @Post()
    async createFacilityService(@Param('facility_code') facility_code: string, @Body() createFacilityServiceDto: CreateFacilityServiceDto)
    : Promise<SuccessFacilityServiceCreatedDto> {

        return await this.facilityServicesService.createFacilityService(facility_code, createFacilityServiceDto);
    }

}
