import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from "lodash";
import * as Joi from '@hapi/joi';
import * as createFacilityServiceSchema from '../../../common/validation_schemas/create-facility-services.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../../../common/entities/facilities.entity';
import { Repository, In } from 'typeorm';
import { Facility_Services } from '../../../common/entities/facility_services.entity';
import { GetFacilityServiceDto, ServiceType, Subservices } from '../../dtos/get-facility-services.dto';
import { CreateFacilityServiceDto } from '../../dtos/create-facility-services.dto';
import { SuccessFacilityServiceCreatedDto, CreatedEntity } from '../../dtos/success-facility-service-created.dto';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';
import { Services } from '../../../common/entities/services.entity';
import { Service_Type } from '../../../common/entities/service_types.entity';
import { InvalidFacilityServiceCodeStructureException } from '../../../exceptions/invalid-facility-service-code-structure.exception';

@Injectable()
export class FacilityServicesService {
    constructor(
        @InjectRepository(Facility_Services) private readonly facilitiesServiceRepository: Repository<Facility_Services>,
        @InjectRepository(Services) private readonly servicesRepository: Repository<Services>,
        @InjectRepository(Service_Type) private readonly serviceTypeRepository: Repository<Service_Type>,
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

            const all_services_types = facilityServices.map((facilityService) => 
            {
                return {
                    service_type: facilityService.services.service_type.service_type,
                    id: facilityService.services.service_type.id,
                };
            });

            return _.uniqBy(all_services_types, 'service_type').map((service_type): ServiceType => {
                return {
                    name: service_type.service_type,
                    services: this.createSubServiceTree(facilityServices, 0, service_type.id)
                };
            })
        }
    }

    private createSubServiceTree(facilityServices: Facility_Services[], parentNode: number, topLevelNode: number): Subservices[] {

        return facilityServices
            .filter(service => service.services.service_category_id === parentNode && service.services.service_type.id === topLevelNode)
            .map(service => {
                const node = {
                    name: null,
                    subservices: null,
                };
                node.name = service.services.service_name;
                node.subservices = this.createSubServiceTree(facilityServices, service.services.id, topLevelNode);

                return node;
            });
    }

    // TODO: Rename variables, code is getting confusing.
    // TODO: Create new Field that list all of the already existing FacilityServices
    // TODO: Create a new exception that is thrown when all of the passed in service ideas already are linked to a facility. 
    async createFacilityService(facility_code: string, createFacilityServiceDto: CreateFacilityServiceDto)
    : Promise<SuccessFacilityServiceCreatedDto> {
        const validation = Joi.validate(createFacilityServiceDto, createFacilityServiceSchema.default);

        if (validation.error) {
            throw new InvalidFacilityServiceCodeStructureException();
            return null;
        }

        const facility = await this.facilityValidatorServiceService.getFacility(facility_code);

        const services = await this.servicesRepository.
                                find({where: { id: In(createFacilityServiceDto.serviceIds.map((serviceId): number => serviceId)) },
                                relations: ['service_type'] });

        const facilityServices = await this.facilitiesServiceRepository.find({where: {facility}, relations: ['services']});

        // Identifying duplicates
        const existingFacilityServices = facilityServices.map(facilityService => facilityService.services.id);
        const duplicateEntities: number[] = createFacilityServiceDto.serviceIds.filter(serviceId => existingFacilityServices.includes(serviceId));

        // Identifying all of the non-existing services
        const allServicesIds = services.map(service => service.id);
        const nonExistingEntities: number[] = createFacilityServiceDto.serviceIds.filter(serviceId => !allServicesIds.includes(serviceId));

        if (allServicesIds.length === 0) {
            throw new HttpException('Invalid Facility Services Provided', HttpStatus.BAD_REQUEST);
            return null;
        }

        const newFacilityServices: Facility_Services[] = services
        .filter(service => !nonExistingEntities.includes(service.id) && !duplicateEntities.includes(service.id))
        .map((service) => {
            const facility_service = new Facility_Services();
            facility_service.facility = facility;
            facility_service.services = service;
            return facility_service;
        });

        if(newFacilityServices.length === 0){
            throw new HttpException({
                message: 'Failed to create new Facility Services',
                nonExistingEntities,
                duplicateEntities,
            }, HttpStatus.BAD_REQUEST);
            return null;
        }

        const insertionQuery = await this.facilitiesServiceRepository.save(newFacilityServices);

        return {
            message: `Successfully Created Facility Services for ${facility.facility_name}`,
            facilityCode: facility_code,
            createdEntities: newFacilityServices.map((facilityService): CreatedEntity => {
                return {
                    serviceId: facilityService.services.id,
                    serviceType: facilityService.services.service_name,
                };
            } ),
            nonExistingEntities,
            duplicateEntities,
        };
    }
}
