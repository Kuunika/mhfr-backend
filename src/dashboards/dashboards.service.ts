import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardDto } from './dtos/dashboard.dto';
import { Facilities } from '../common/entities/facilities.entity';
import { DashboardView } from '../common/entities/dashboard.view.entity';

@Injectable()
export class DashboardsService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>,
                @InjectRepository(DashboardView) private readonly dashboardViewRepository: Repository<DashboardView>) {}

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

    // TODO: Need to Refactor
    private createDashboardDto(dashboardView: DashboardView[]): DashboardDto {
        const districtHospitals: number = dashboardView
                                            .map((facility): number => Number(facility.district_hospital))
                                            .reduce((total, current) => total += current);

        const healthCenters: number = dashboardView
                                            .map((facility): number => Number(facility.health_centre))
                                            .reduce((total, current) => total += current);

        const dispensaries: number  = dashboardView
                                            .map((facility): number => Number(facility.dispensary))
                                            .reduce((total, current) => total += current);

        const healthPosts: number   = dashboardView
                                            .map((facility): number => Number(facility.health_post))
                                            .reduce((total, current) => total += current);

        const registered: number = dashboardView
                                            .map((facility): number => Number(facility.registered))
                                            .reduce((total, current) => total += current);

        const pending: number = dashboardView
                                            .map((facility): number => Number(facility.pending))
                                            .reduce((total, current) => total += current);

        const notRegistered: number = dashboardView
                                            .map((facility): number => Number(facility.not_registered))
                                            .reduce((total, current) => total += current);

        const functional: number = dashboardView
                                            .map((facility): number => Number(facility.functional))
                                            .reduce((total, current) => total += current);

        const closedTemp: number = dashboardView
                                            .map((facility): number => Number(facility.closed_temporary))
                                            .reduce((total, current) => total += current);

        const closed: number = dashboardView
                                            .map((facility): number => Number(facility.closed))
                                            .reduce((total, current) => total += current);

        const totalFacilities: number = dispensaries + healthPosts + districtHospitals + healthCenters;


        return {
            totalFacilities,
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
        };
    }
}
