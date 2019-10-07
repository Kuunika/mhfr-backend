import { Injectable, NotImplementedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { Repository } from 'typeorm';
import { CreateFacilityDto } from './dtos/create-facility.dto';
import * as helper from '../common/helpers/null-or-string.helper';
import { Owners } from '../common/entities/owners.entity';
import * as _ from 'lodash';
import { Districts } from '../common/entities/districts.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { GetFacilitiesDto } from './dtos/get-facilities.dto';
import { FacilityCodeService } from './facility-code.service';
import { Facility_Types } from '../common/entities/facility_types.entity';

@Injectable()
export class FacilitiesService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>,
                @InjectRepository(Owners) private readonly ownersRepository: Repository<Owners>,
                @InjectRepository(Districts) private readonly districtsRepository: Repository<Districts>,
                @InjectRepository(Operational_Status) private readonly operationalStatus: Repository<Operational_Status>,
                @InjectRepository(Regulatory_Status) private readonly regulatoryStatus: Repository<Regulatory_Status>,
                @InjectRepository(Facility_Types) private readonly facilityTypeRepository: Repository<Facility_Types>,
                private readonly facilityCodeService: FacilityCodeService) {}

    async getAllFacilities(): Promise<GetFacilitiesDto[]> {
        const facilities = await this.facilitiesRepository.find(
            {relations: ['district', 'facility_type', 'facility_operational_status', 'facility_owner']});
        return facilities.map((facility) => {
            return {
                "id":         facility.facility_id,
                "code":       facility.facility_code,
                "name":       facility.facility_name,
                "commonName": facility.common_name,
                "ownership":  helper.nullOrString(facility.facility_owner, 'facility_owner'),
                "type":       helper.nullOrString(facility.facility_type, 'facility_type'),
                "status":     helper.nullOrString(facility.facility_operational_status, 'facility_operational_status'),
                "district":   helper.nullOrString(facility.district, 'district_name'),
                "dateOpened": facility.facility_date_opened,
            }
        });
    }

    async createFacility(createFacilityDto: CreateFacilityDto): Promise<object> {
        const facility =  new Facilities();
        const relations = await this.getRelations(createFacilityDto);

        facility.facility_name = createFacilityDto.name;
        facility.facility_date_opened = createFacilityDto.dateOpened;
        facility.common_name = createFacilityDto.commonName;
        facility.district = relations.district;
        facility.facility_code = await this.facilityCodeService.createFacilityCode(createFacilityDto.districtId);
        facility.facility_code_mapping = createFacilityDto.codeMap;
        facility.facility_operational_status = relations.operationalStatus;
        facility.facility_regulatory_status = relations.regulatoryStatus;
        facility.facility_owner = relations.owner;
        facility.facility_type = relations.facilityType;

        this.facilitiesRepository.save(facility);
        return {success: 'Successfully Create Basic Details'};
    }

    // TODO: Refactor to clean the parameter.
    private async getRelations({ districtId, operationalStatusId, registrationStatusId, ownerId, facilityTypeId }:
         { districtId: number; operationalStatusId: number; registrationStatusId: number; ownerId: number; facilityTypeId: number; }): 
    Promise<{ district, operationalStatus, regulatoryStatus, owner, facilityType, }> {

        const district          = await this.districtsRepository.findOne(districtId);
        const operationalStatus = await this.operationalStatus.findOne(operationalStatusId);
        const regulatoryStatus  = await this.regulatoryStatus.findOne(registrationStatusId);
        const owner             = await this.ownersRepository.findOne(ownerId);
        const facilityType      = await this.facilityTypeRepository.findOne(facilityTypeId);

        this.validateRelationExists(district, 'District');
        this.validateRelationExists(operationalStatus, 'Operational Status Id');
        this.validateRelationExists(regulatoryStatus, 'Regulatory Status Id');
        this.validateRelationExists(owner, 'Owner Id');
        this.validateRelationExists(facilityType, 'Facility Type Id');

        return {
            district,
            operationalStatus,
            regulatoryStatus,
            owner,
            facilityType,
        };
    }

    // TODO: Refactor into Another 
    private validateRelationExists(databaseReturn: object, databaseItemName: string) {
        if (databaseReturn) { return databaseReturn; }
        throw new HttpException({
                message: `The ID you specified for the ${databaseItemName} does not exist`,
                errorBag: [
                    {
                        field: `${databaseItemName}Id`,
                        message: `The ID you specified for the ${databaseItemName} does not exist`,
                    },
                ]
        }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
