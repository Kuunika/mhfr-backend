import { Controller, Get, Param } from '@nestjs/common';
import { GetFacilitiesUtilitiesDto } from '../../dtos/get-facilities-utilities.dto';
import { FacilitiesUtilitiesService } from './facilities-utilities.service';

@Controller('facilities/:facility_code/utilities')
export class FacilitiesUtilitiesController {

    constructor(private readonly facilitiesUtilitiesService: FacilitiesUtilitiesService) {}

    @Get()
    getAllFacilitiesUtilities(@Param('facility_code') facility_code: string): Promise<GetFacilitiesUtilitiesDto> {
        return this.facilitiesUtilitiesService.getFacilitiesUtilities(facility_code);
    }
}
