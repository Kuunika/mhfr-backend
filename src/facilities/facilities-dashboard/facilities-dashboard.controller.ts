import { Controller, Get } from '@nestjs/common';
import { FacilitiesDashboardDto } from '../dtos/facilities-dashboard.dto';

@Controller('api/v2/dashboard')
export class FacilitiesDashboardController {
    constructor() {}

    @Get()
    getDashboard(): FacilitiesDashboardDto {
        const dashboard = new FacilitiesDashboardDto();

        return dashboard;
    }

}
