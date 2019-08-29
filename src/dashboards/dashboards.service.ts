import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardDto } from './dtos/dashboard.dto';
import { FacilityTypeDashboardAggregate } from '../common/entities/facility_type_dashboard_aggregate_view.entity';
import { Facilities } from '../common/entities/facilities.entity';
import * as convert from '../common/helpers/convert-to-json.helper';
import * as dtoHelper from './helpers/create-dashboard-dto.helper';
import { objectMapping } from '../common/helpers/object-mapping.helper';

@Injectable()
export class DashboardsService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>) {}

    async getDashboardReport(): Promise<DashboardDto> {
        const dashBoardDto = new DashboardDto();
        dashBoardDto.totalFacilities = await this.facilitiesRepository.count();

        const facilityTypes = await this.createFacilityTypesView();
        const facilitiesRegStatuses = await this.createFacilitiesRegStatusView();
        const facilityOperationalStatuses = await this.createFacilityOperationalStatus();

        const facilityTypesObject = dtoHelper.createFacilityTypesObject(facilityTypes);
        dashBoardDto.dispensaries = facilityTypesObject.dispensaries;
        dashBoardDto.districtHospitals = facilityTypesObject.districtHospitals;
        dashBoardDto.healthCenters = facilityTypesObject.healthCenters;
        dashBoardDto.healthPosts = facilityTypesObject.healthPosts;

        dashBoardDto.licenseStatus = dtoHelper.createLicenseStatusObject(facilitiesRegStatuses);
        dashBoardDto.operationalStatus = dtoHelper.createOperationalStatusObject(facilityOperationalStatuses);
        return dashBoardDto;
    }

    private async createFacilityTypesView() {
        const facilityType = await this.facilitiesRepository.createQueryBuilder('facilities')
        .innerJoinAndSelect('facilities.facility_type', 'facility_types')
        .select(['facility_types.facility_type as type_of_facility', 'COUNT(facilities.facility_id) as number_of_facilities' ])
        .groupBy('facility_types.facility_type')
        .addGroupBy('facilities.facility_type')
        .getRawMany();
        return convert.convertToJSON(facilityType);
    }

    private async createFacilitiesRegStatusView()  {
        const facilityRepository = await this.facilitiesRepository.createQueryBuilder('facilities')
        .innerJoinAndSelect('facilities.facility_regulatory_status', 'regulatory_status')
        .select(['regulatory_status.facility_regulatory_status as regulatory_status', 'COUNT(facilities.facility_id) as number_of_facilities'])
        .groupBy('regulatory_status.facility_regulatory_status')
        .getRawMany();
        return convert.convertToJSON(facilityRepository);
    }

    private async createFacilityOperationalStatus() {
        const facilityOperational = await this.facilitiesRepository.createQueryBuilder('facilities')
        .innerJoinAndSelect('facilities.facility_operational_status', 'operational_status')
        .select(['operational_status.facility_operational_status as operationalStatus', 'COUNT(facilities.facility_id) as number_of_facilities'])
        .groupBy('operational_status.facility_operational_status')
        .getRawMany();
        return convert.convertToJSON(facilityOperational);
    }

}
