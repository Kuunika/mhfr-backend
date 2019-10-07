import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Repository } from 'typeorm';
import { Facility_Services } from '../../../common/entities/facility_services.entity';
import { GetFacilityServiceDto, ServiceType } from '../../dtos/get-facility-services.dto';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

@Injectable()
export class FacilityServicesService {
    constructor(
        @InjectRepository(Facility_Services) private readonly facilitiesServiceRepository: Repository<Facility_Services>,
        private readonly facilitiesSummaryHelper: FacilitiesSummaryHelper,
        private readonly facilityValidatorServiceService: FacilityValidatorServiceService) { }

    async getFacilityServices(facility_code: string): Promise<GetFacilityServiceDto> {
        const facility = await this.facilityValidatorServiceService.getFacility(facility_code, ['district', 'facility_operational_status']);

        const facilityServices = await this.facilitiesServiceRepository
            .find({ relations: ['services', 'services.service_type'], where: { facility } });

        return this.createGetFacilitiesDto(facility, facilityServices);
    }

    private createGetFacilitiesDto(facility: Facilities, facilityServices: Facility_Services[]): GetFacilityServiceDto {
        return {
            summary: this.facilitiesSummaryHelper.facilitySummary(facility),
            services: {
                serviceTypes: this.getServiceTypes(facilityServices),
            }
        };
    }

    private getServiceTypes(facilityServices: Facility_Services[]): ServiceType[] {
        if (facilityServices) {
            const service_types = new Set(facilityServices.map((facilityService): string => facilityService.services.service_type.service_type));
            return [...service_types].map((service_type): ServiceType => {
                return {
                    name: service_type,
                    subservices: null,
                };
            })
        }
    }
}
