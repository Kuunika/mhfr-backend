import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facility_Utilities } from '../../../common/entities/facility_utilities.entity';
import { Utility_Type } from '../../../common/entities/utility_types.entity';
import { Facilities } from '../../../common/entities/facilities.entity';
import { GetFacilitiesUtilitiesDto, UtilityType } from '../../dtos/get-facilities-utilities.dto';
import { Repository, In } from 'typeorm';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';
import { JoiDtoValidatorHelper} from '../../../common/helpers/joi-dto-validator-helper';
import { DtoIdsValidatorHelper, DtoIdsValidatorReturnObject} from '../../../common/helpers/dto-ids-validator-helper';
import { Utilities } from '../../../common/entities/utilities.entity';
import { CreateFacilityUtilitiesDto } from '../../dtos/create-facility-utilities.dto';
import { SuccessFacilityUtilitiesCreatedDto, CreatedEntity } from '../../dtos/success-facility-utilities-created.dto';

@Injectable()
export class FacilitiesUtilitiesService {
    constructor(@InjectRepository(Facility_Utilities) private readonly facilityUtilitiesRepository: Repository<Facility_Utilities>,
                @InjectRepository(Utility_Type) private readonly utilityTypeRepository: Repository<Utility_Type>,
                @InjectRepository(Utilities) private readonly utilitiesRepository: Repository<Utilities>,
                private readonly facilitiesSummaryHelper: FacilitiesSummaryHelper,
                private readonly facilityValidatorServiceService: FacilityValidatorServiceService,
                private readonly joiDtoValidator: JoiDtoValidatorHelper,
                private readonly dtoIdsValidatorHelper: DtoIdsValidatorHelper) {}

    async getFacilitiesUtilities(facility_code: string): Promise<GetFacilitiesUtilitiesDto> {
        const facility = await this.facilityValidatorServiceService
                                   .getFacility(facility_code, ['district', 'facility_operational_status']);

        const facilityUtilities = await this.facilityUtilitiesRepository
                                        .find({relations: ['utility', 'utility.utility_type'], where: {facility}});

        return this.createGetFacilitiesUtilitiesDto(facilityUtilities, facility);

    }

    private createGetFacilitiesUtilitiesDto(facilityUtilities: Facility_Utilities[], facility: Facilities): GetFacilitiesUtilitiesDto  {
        return {
            summary: this.facilitiesSummaryHelper.facilitySummary(facility),
            utilities: {
                utilityTypes: this.getAllUtilitiesAndUtilityTypes(facilityUtilities),
            }
        };
    }

    private getAllUtilitiesAndUtilityTypes(facilityUtilities: Facility_Utilities[]): UtilityType[] {
        if (facilityUtilities) {
            const utility_types = new Set(facilityUtilities.map((facilityUtil): string => facilityUtil.utility.utility_type.utility_type));

            return [...utility_types].map((utility_type): UtilityType => {
                return {
                    name: utility_type,
                    utilities: facilityUtilities
                    .filter((facilityUtility) => facilityUtility.utility.utility_type.utility_type === utility_type)
                    .map((facilityUtility): string => {
                        return facilityUtility.utility.utility_name;
                    })
                }
            })
        }
        return null;
    }

    async createFacilityUtilities(facility_code: string, createFacilityUtilitiesDto: CreateFacilityUtilitiesDto): Promise<SuccessFacilityUtilitiesCreatedDto> {
        const facility = await this.facilityValidatorServiceService.getFacility(facility_code);
        const facility_utilities = await this.facilityUtilitiesRepository
        .find({relations: ['utility'] , where: {facility}});
        const utilities = await this.utilitiesRepository.find({
            where: {id: In(createFacilityUtilitiesDto.utilityIds) }
        });
        const allUtilitiesIds = utilities.map(utility => utility.id);

        if (allUtilitiesIds.length === 0) {
            throw new HttpException({
                message: 'No records of utilities found, please ensure service records exist before continuing',
                code: 500,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const {nonExistingEntities, duplicateEntities, validEntitiesFromDto} = await this.dtoIdsValidatorHelper.filterIdsFromDto(
            createFacilityUtilitiesDto.utilityIds,
            allUtilitiesIds,
            facility_utilities.map(Facility_Utilities => Facility_Utilities.utility.id),
            'Failed to create new Facility Utilities',
            );

        const newFacilitiesUtilities: Facility_Utilities[] = validEntitiesFromDto
        .map((utilitiesId) => {
            const facility_utility = new Facility_Utilities();
            facility_utility.facility = facility;
            facility_utility.utility = utilities.find(utility => utility.id === utilitiesId);
            return facility_utility;
        });

        await this.facilityUtilitiesRepository.save(newFacilitiesUtilities);

        return {
            message: `Successfully Created Facility Utilities for ${facility.facility_name}`,
            facilityCode: facility_code,
            createdEntities: newFacilitiesUtilities.map((facilityUtility): CreatedEntity => {
                return {
                    utilityId: facilityUtility.utility.id,
                    utilityType: facilityUtility.utility.utility_name,
                };
            } ),
            nonExistingEntities,
            duplicateEntities,
        };
    }
}
