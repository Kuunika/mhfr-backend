import { Controller, Param, Get } from '@nestjs/common';
import { GetFacilityServiceDto } from '../../dtos/get-facility-services.dto';
import { FacilityServicesService } from './facility-services.service';

@Controller('facilities/:facility_code/services')
export class FacilityServicesController {
    constructor(private readonly facilityServicesService: FacilityServicesService) {}

    @Get()
    async getFacilityServices(@Param('facility_code') facility_code: string):Promise<GetFacilityServiceDto> {
        return await this.facilityServicesService.getFacilityServices(facility_code);
    }

}
