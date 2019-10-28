import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as createFacilityResourceSchema from '../../../common/validation_schemas/create-facility-resources.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Facility_Resources } from '../../../common/entities/facility_resources.entity';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Resource_Type } from '../../../common/entities/resource_type.entity';
import { FacilitiesResourcesDto, Resource, ResourceType} from '../../dtos/facilities-resources.dto';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';
import { Resources } from '../../../common/entities/resources.entity';
import { CreateFacilityResourcesDto} from '../../dtos/create-facility-resources.dto';
import { JoiDtoValidatorHelper } from '../../../common/helpers/joi-dto-validator-helper';
import { DtoIdsValidatorHelper } from '../../../common/helpers/dto-ids-validator-helper';
import { InvalidFacilityResourcesStructureException } from '../../../exceptions/invalid-facility-resource-structure.exception';


// TODO: Then naming is a little scary and needs retooling so as to prevent issues where 
// TODO: Create Integrity Check to prevented two records with the same facility ID and Resource ID from being entered.
@Injectable()
export class FacilitiesResourcesService {

    constructor(@InjectRepository(Facility_Resources) private readonly facilityResourcesRepository: Repository<Facility_Resources>,
                @InjectRepository(Resources) private readonly resourcesRepository: Repository<Resources>,
                @InjectRepository(Resource_Type) private readonly resourceTypeRepository: Repository<Resource_Type>,
                private readonly facilitiesSummaryHelper: FacilitiesSummaryHelper,
                private readonly facilityValidatorServiceService: FacilityValidatorServiceService,
                private readonly joiDtoValidator: JoiDtoValidatorHelper,
                private readonly dtoIdsValidatorHelper: DtoIdsValidatorHelper) {}

    async getFacilitiesResources(facility_code: string): Promise<FacilitiesResourcesDto> {
        const facility = await this.facilityValidatorServiceService.getFacility(facility_code, ['district', 'facility_operational_status']);

        const facility_resource = await this.facilityResourcesRepository.
            find({relations: ['facility', 'resources', 'resources.resource_type'], where: {facility}});

        return this.createGetFacilitiesResourcesDto(facility_resource, facility);
    }

    private async createGetFacilitiesResourcesDto(facility_resources: Facility_Resources[], facility: Facilities): Promise<FacilitiesResourcesDto> {
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

    async createSuccessFacilityResourcesCreatedDto(facility_code: string, createFacilitiesResourcesDto: CreateFacilityResourcesDto){

        this.joiDtoValidator.validateDto(createFacilityResourceSchema.default, createFacilitiesResourcesDto,
            new InvalidFacilityResourcesStructureException());
        const facility = await this.facilityValidatorServiceService.getFacility(facility_code);
        const facilityResources = await this.facilityResourcesRepository.find({where:{facility}, relations:['resources']});
        const resources = await this.resourcesRepository.find({where: {id: In(createFacilitiesResourcesDto.resources.map(resource => resource.id))}});

        const allResourceIds = resources.map(resource => resource.id);

        const {nonExistingEntities, duplicateEntities, validEntitiesFromDto} = await this.dtoIdsValidatorHelper.filterIdsFromDto(
            createFacilitiesResourcesDto.resources.map(resource => resource.id),
            allResourceIds,
            facilityResources.map(resource => resource.resources.id),
            'Failed to create new Facility Resource',
        );

        const newFacilityResource: Facility_Resources[] = validEntitiesFromDto.map
        ((resourceId) => {
            const facilityResource =  new Facility_Resources();
            const {quantity, description} = createFacilitiesResourcesDto.resources.find(resource => resource.id === resourceId);
            facilityResource.facility = facility;
            facilityResource.quantity = quantity;
            facilityResource.resources = resources.find(resource => resource.id === resourceId);
            facilityResource.description = description;
            return facilityResource;
        });

        await this.facilityResourcesRepository.save(newFacilityResource);

        return {
            message: `Successfully Created Facility Services for ${facility.facility_name}`,
            facilityCode: facility_code,
            createdEntities: newFacilityResource.map((facilityResource) => {
                return {
                    resourceId: facilityResource.resources.id,
                    resourceType: facilityResource.resources.resource_name,
                    quantity: facilityResource.quantity,
                };
            }),
            nonExistingEntities,
            duplicateEntities,
        };
    }

}
