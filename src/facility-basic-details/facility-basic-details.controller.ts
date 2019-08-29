import { Controller, Get, Param } from '@nestjs/common';
import { FacilityBasicDetailsService } from './facility-basic-details.service';
import { FacilityBasicDetailsDto } from './dtos/facility-basic-details.dto';

@Controller('facility-basic-details')
export class FacilityBasicDetailsController {
    constructor(private readonly facilityBasicDetailsService: FacilityBasicDetailsService) {}

    @Get('/:facility_code')
    async getFacilityBasicDetails(@Param('facility_code') facility_code: string): Promise<FacilityBasicDetailsDto> {
        return await this.facilityBasicDetailsService.getFacilityBasicDetails(facility_code);
    }

}
