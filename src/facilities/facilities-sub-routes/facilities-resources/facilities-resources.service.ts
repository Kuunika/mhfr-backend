import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility_Resources } from '../../../common/entities/facility_resources.entity';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Resource_Type } from '../../../common/entities/resource_type.entity';
import { FacilitiesResourcesDto, Resource, ResourceType} from '../../dtos/facilities-resources.dto';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

// TODO: Create Integrity Check to prevented two records with the same facility ID and Resource ID from being entered.
@Injectable()
export class FacilitiesResourcesService {

    constructor(@InjectRepository(Facility_Resources) private readonly facilityResourcesRepository: Repository<Facility_Resources>,
                @InjectRepository(Resource_Type) private readonly resourceTypeRepository: Repository<Resource_Type>,
                private readonly facilitiesSummaryHelper: FacilitiesSummaryHelper,
                private readonly facilityValidatorServiceService: FacilityValidatorServiceService) {}

    async getFacilitiesResources(facility_code: string): Promise<FacilitiesResourcesDto> {
        const facility = await this.facilityValidatorServiceService.getFacility(facility_code, ['district', 'facility_operational_status']);

        const facility_resource = await this.facilityResourcesRepository.
            find({relations: ['facility', 'resources', 'resources.resource_type'], where: {facility}});

        return this.createFacilitiesResourcesDto(facility_resource, facility);
    }

    private async createFacilitiesResourcesDto(facility_resources: Facility_Resources[], facility: Facilities): Promise<FacilitiesResourcesDto> {
        const resource_types = await this.resourceTypeRepository.find();

        // TODO: Either Refactor or Provide a Better Description of what is going on.
        const resourceTypes  = resource_types.map((resourceType): ResourceType => {
            const filteredFilteredResources = facility_resources.filter((resource) => resource.resources.resource_type.id === resourceType.id);
            return{
                name: resourceType.resource_type,
                resources: filteredFilteredResources.map((resource): Resource => {
                    return {
                        name: resource.resources.resource_name,
                        value: resource.quantity,
                    };
                }),
            }
        });

        const summary = this.facilitiesSummaryHelper.facilitySummary(facility);

        return {
            summary,
            resourceTypes,
        };
    }
}
