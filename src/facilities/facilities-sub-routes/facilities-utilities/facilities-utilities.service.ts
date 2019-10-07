import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facility_Utilities } from '../../../common/entities/facility_utilities.entity';
import { Utility_Type } from '../../../common/entities/utility_types.entity';
import { Facilities } from '../../../common/entities/facilities.entity';
import { GetFacilitiesUtilitiesDto, UtilityType } from '../../dtos/get-facilities-utilities.dto';
import { Repository } from 'typeorm';
import { FacilitiesSummaryHelper } from '../../facilities-summary-helper';
import { FacilityValidatorServiceService } from '../../facility-validator-service.service';

@Injectable()
export class FacilitiesUtilitiesService {
    constructor(@InjectRepository(Facility_Utilities) private readonly facilityUtilitiesRepository: Repository<Facility_Utilities>,
                @InjectRepository(Utility_Type) private readonly utilityTypeRepository: Repository<Utility_Type>,
                private readonly facilitiesSummaryHelper: FacilitiesSummaryHelper,
                private readonly facilityValidatorServiceService: FacilityValidatorServiceService) {}

    async getFacilitiesUtilities(facility_code: string): Promise<GetFacilitiesUtilitiesDto> {
        const facility = await this.facilityValidatorServiceService
                                   .getFacility(facility_code, ['district', 'facility_operational_status']);

        const facilityUtilities = await this.facilityUtilitiesRepository
                                        .find({relations: ['utility', 'utility.utility_type'], where: {facility}});

        return this.createFacilityUtilitiesDto(facilityUtilities, facility);

    }

    private createFacilityUtilitiesDto(facilityUtilities: Facility_Utilities[], facility: Facilities): GetFacilitiesUtilitiesDto  {
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
}
