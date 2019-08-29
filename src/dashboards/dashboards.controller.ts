import { Controller, Get } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardDto } from './dtos/dashboard.dto';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardService: DashboardsService) {}

    @Get()
    getDashBoard(): Promise<DashboardDto> {
        return this.dashboardService.getDashboardReport();
    }

}
