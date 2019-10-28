import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardDto } from './dtos/dashboard.dto';
import { Facilities } from '../common/entities/facilities.entity';
import { DashboardView } from '../common/entities/dashboard.view.entity';

@Injectable()
export class DashboardsService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>,
                @InjectRepository(DashboardView) private readonly dashboardViewRepository: Repository<DashboardView>) { }

    async getDashboardReport(districtCodes?: string[]): Promise<DashboardDto> {
        const dashboardView = await this.dashboardViewRepository.find();

        const validatedDistrictCodes = this.validateDistrictCodes(districtCodes);

        const validSetOfDistrictCodes: boolean = districtCodes !== undefined && validatedDistrictCodes.length > 0;
        return validSetOfDistrictCodes ? this.filterDashboard(validatedDistrictCodes, dashboardView) : this.createDashboardDto(dashboardView);
    }

    private validateDistrictCodes(districtCodes: string[]): string[] {
        const validDistrictCodes = ['MC', 'DA', 'DE', 'LL', 'KB', 'CP', 'KU', 'NT', 'SA', 'NK', 'KC', 'NT', 'MU',
            'RU', 'KA', 'MZ', 'BK', 'LK', 'MC', 'MG', 'MU', 'PH', 'ZA', 'BT', 'QE', 'CR', 'CK', 'MW', 'NE', 'NS', 'TH'];
        return districtCodes ? districtCodes.map((code) => code.toUpperCase()).filter((code) => validDistrictCodes.includes(code)) : [];
    }

    private filterDashboard(districtCodes: string[], dashboardView: DashboardView[]): DashboardDto {
        return this.createDashboardDto(dashboardView.filter((facility) => districtCodes.includes(facility.district_code)));
    }

    private createDashboardDto(dashboardView: DashboardView[]): DashboardDto {

        const dashboardViewTotals = this.calculateDashboardViewTotals(dashboardView, [
            'district_hospital',
            'health_centre',
            'dispensary',
            'health_post',
            'registered',
            'pending',
            'not_registered',
            'functional',
            'closed_temporary',
            'closed',
        ]);

        const mappings = this.mappingDashboardViewNames(dashboardViewTotals);

        return this.createDashboardDtoFromMappings(mappings);
    }

    private calculateDashboardViewTotals(dashboardViews: DashboardView[], dashboardViewKeys: string[]) {
       const dashBoardViewTotals = {};
       dashboardViewKeys.forEach(key => {
            dashBoardViewTotals[key] = dashboardViews.reduce((accumulator, dashboardView): number => Number(dashboardView[key]) + accumulator, 0);
       });
       return dashBoardViewTotals;
    }

    private mappingDashboardViewNames(dashboardViewTotals): DashboardMappings {

        const dashboardPayload = {
            districtHospitals: dashboardViewTotals.district_hospital,
            healthCenters: dashboardViewTotals.health_centre,
            dispensaries: dashboardViewTotals.dispensary,
            healthPosts: dashboardViewTotals.health_post,
            registered: dashboardViewTotals.registered,
            pending: dashboardViewTotals.pending,
            notRegistered: dashboardViewTotals.not_registered,
            functional: dashboardViewTotals.functional,
            closedTemp: dashboardViewTotals.closed_temporary,
            closed: dashboardViewTotals.closed,
            totalFacilities: null,
        };

        dashboardPayload.totalFacilities = dashboardPayload.dispensaries + dashboardPayload.healthPosts
                                        + dashboardPayload.districtHospitals + dashboardPayload.healthCenters;
        return dashboardPayload;

    }

    private createDashboardDtoFromMappings(mappedDashboardViewNames: DashboardMappings): DashboardDto {

        const {districtHospitals, healthCenters, dispensaries, healthPosts,
            registered, pending, notRegistered, functional, closedTemp,
            closed, totalFacilities} = mappedDashboardViewNames;

        return {
            districtHospitals,
            healthCenters,
            dispensaries,
            healthPosts,
            licenseStatus: {
                registered,
                pending,
                notRegistered,
            },
            operationalStatus: {
                functional,
                closedTemp,
                closed,
            },
            totalFacilities,
        };
    }
}

interface DashboardMappings {
    districtHospitals: number;
    healthCenters: number;
    dispensaries: number;
    healthPosts: number;
    registered: number;
    pending: number;
    notRegistered: number;
    functional: number;
    closedTemp: number;
    closed: number;
    totalFacilities: number;
}
