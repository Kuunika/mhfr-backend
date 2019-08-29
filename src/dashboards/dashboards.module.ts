import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityTypeDashboardAggregate } from '../common/entities/facility_type_dashboard_aggregate_view.entity';
import { Facilities } from '../common/entities/facilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacilityTypeDashboardAggregate, Facilities])],
  providers: [DashboardsService],
  controllers: [DashboardsController],
})
export class DashboardsModule {}
