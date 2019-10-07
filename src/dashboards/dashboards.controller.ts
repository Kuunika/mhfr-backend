import { Controller, Get, Query } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardDto } from './dtos/dashboard.dto';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardService: DashboardsService) {}

    @Get()
    getDashBoard(@Query('dst') queryDistricts): Promise<DashboardDto> {
        const districtCodes = Array.isArray(queryDistricts) ? queryDistricts :
                                        queryDistricts === undefined ? undefined : [queryDistricts];

        return this.dashboardService.getDashboardReport(districtCodes);
    }
}
