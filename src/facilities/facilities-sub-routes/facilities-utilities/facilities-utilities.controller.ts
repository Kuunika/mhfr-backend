import { Controller, Get, Param, Post, Body} from '@nestjs/common';
import { GetFacilitiesUtilitiesDto } from '../../dtos/get-facilities-utilities.dto';
import { CreateFacilityUtilitiesDto } from '../../dtos/create-facility-utilities.dto';
import { FacilitiesUtilitiesService } from './facilities-utilities.service';
import { SuccessFacilityUtilitiesCreatedDto } from '../../dtos/success-facility-utilities-created.dto';


@Controller('facilities/:facility_code/utilities')
export class FacilitiesUtilitiesController {

    constructor(private readonly facilitiesUtilitiesService: FacilitiesUtilitiesService) {}

    @Get()
    getAllFacilitiesUtilities(@Param('facility_code') facility_code: string): Promise<GetFacilitiesUtilitiesDto> {
        return this.facilitiesUtilitiesService.getFacilitiesUtilities(facility_code);
    }

    @Post()
    createFacilityUtilities(@Param('facility_code') facility_code: string, @Body() createFacilityUtilitiesDto: CreateFacilityUtilitiesDto): Promise<SuccessFacilityUtilitiesCreatedDto>  {
        return this.facilitiesUtilitiesService.createFacilityUtilities(facility_code, createFacilityUtilitiesDto);
    }
}
