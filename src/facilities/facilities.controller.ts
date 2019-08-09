import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from '../common/dtos/create-facility.dto';
import { FrontEndRetrieveAllFacilitiesDto } from './dtos/front-end-retrieve-all-facilities.dto';
import * as helper from '../common/helpers/null-or-string.helper';

@Controller('facilities')
export class FacilitiesController {
    constructor(private readonly facilitiesService: FacilitiesService) {}

    @Get()
    async getAllFacilities(): Promise<FrontEndRetrieveAllFacilitiesDto[]> {
        const facilities = new Array<FrontEndRetrieveAllFacilitiesDto>();
        const allFacilities = await this.facilitiesService.getAllFacilities();
        for (const facility of allFacilities) {
            facilities.push({
                "id":         facility.facility_id,
                "code":       facility.facility_code,
                "name":       facility.facility_name,
                "commonName": facility.common_name,
                "ownership":  helper.nullOrString(facility.facility_owner, 'facility_owner'),
                "type":       helper.nullOrString(facility.facility_type, 'facility_type'),
                "status":     helper.nullOrString(facility.facility_operational_status, 'facility_operational_status'),
                "district":   helper.nullOrString(facility.district, 'distric_name'),
                "dateOpened": facility.facility_date_opened,
            });
        }
        return facilities;
    }

    @Get('/:id')
    async getFacilities(@Param('id') id: number) {
        return await this.facilitiesService.getFacility(id);
    }

    @Post()
    async createFacility(@Body() createFacilityDto: CreateFacilityDto){
        return await this.facilitiesService.createFacility(createFacilityDto);
    }
}
