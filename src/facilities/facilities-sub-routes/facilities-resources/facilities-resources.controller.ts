import { Controller, Get, Param } from '@nestjs/common';
import {FacilitiesResourcesDto} from '../../dtos/facilities-resources.dto';
import {FacilitiesResourcesService} from './facilities-resources.service';

@Controller('facilities/:facility_code/resources')
export class FacilitiesResourcesController {
    //TODO Create the Get Route and service
    //TODO Export Data from data dump

    constructor(private readonly facilitiesResourcesService: FacilitiesResourcesService) {}

    @Get()
    async getFacilitiesResources(@Param('facility_code') facility_code: string): Promise<FacilitiesResourcesDto> {
        return this.facilitiesResourcesService.getFacilitiesResources(facility_code);
    }
}
