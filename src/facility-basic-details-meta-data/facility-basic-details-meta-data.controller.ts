import { Controller, Get } from '@nestjs/common';
import { FacilityBasicDetailsMetaDataService } from './facility-basic-details-meta-data.service';
import {FacilityBasicDetailsMetaDataDto} from './dtos/facility-basic-details-meta-data.dto';
@Controller('facility-basic-details-meta-data')
export class FacilityBasicDetailsMetaDataController {

    constructor(private readonly facilityBasicDetailsMetaDataService: FacilityBasicDetailsMetaDataService) {}

    @Get()
    async getFacilityBasicDetailsMetaData(): Promise<FacilityBasicDetailsMetaDataDto> {
        return await this.facilityBasicDetailsMetaDataService.getFacilityBasicDetailsMetaDataDto();
    }

}
