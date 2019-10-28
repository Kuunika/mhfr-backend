import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dtos/create-facility.dto';
import { GetFacilitiesDto } from './dtos/get-facilities.dto';
import * as createFacilitiesSchema from '../common/validation_schemas/create-facility.schema';
import * as Joi from '@hapi/joi';

@Controller('facilities')
export class FacilitiesController {
    constructor(private readonly facilitiesService: FacilitiesService) {}

    @Get()
    async getAllFacilities(): Promise<GetFacilitiesDto[]> {
        return await this.facilitiesService.getAllFacilities();
    }

    @Post()
    async createFacility(@Body() createFacilityDto: CreateFacilityDto){
        const validation = Joi.validate(createFacilityDto, createFacilitiesSchema.default);
        if(validation.error) {
            throw new HttpException('Bad Request. Please carefully check your request body', HttpStatus.BAD_REQUEST);
            return null;
        }

        return await this.facilitiesService.createFacility(createFacilityDto);

    }
}
