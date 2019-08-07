import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from '../common/dtos/create-facility.dto';

@Controller('api/v2/facilities')
export class FacilitiesController {
    constructor(private readonly facilitiesService: FacilitiesService) {}

    @Get()
    async getAllFacilities() {
        return await this.facilitiesService.getAllFacilities();
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
