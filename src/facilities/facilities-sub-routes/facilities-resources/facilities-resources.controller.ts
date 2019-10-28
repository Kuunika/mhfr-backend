import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {FacilitiesResourcesDto} from '../../dtos/facilities-resources.dto';
import {FacilitiesResourcesService} from './facilities-resources.service';
import {CreateFacilityResourcesDto} from '../../dtos/create-facility-resources.dto';

@Controller('facilities/:facility_code/resources')
export class FacilitiesResourcesController {
    constructor(private readonly facilitiesResourcesService: FacilitiesResourcesService) {}

    @Get()
    getFacilitiesResources(@Param('facility_code') facility_code: string): Promise<FacilitiesResourcesDto> {
        return this.facilitiesResourcesService.getFacilitiesResources(facility_code);
    }

    @Post()
    createFacilityResource(@Param('facility_code') facility_code: string, @Body() createFacilitiesResourcesDto: CreateFacilityResourcesDto){
        return this.facilitiesResourcesService.createSuccessFacilityResourcesCreatedDto(facility_code, createFacilitiesResourcesDto);
    }
}
