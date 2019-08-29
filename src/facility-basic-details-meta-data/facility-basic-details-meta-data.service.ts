import { Injectable } from '@nestjs/common';
import {FacilityBasicDetailsMetaDataDto} from './dtos/facility-basic-details-meta-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owners } from '../common/entities/owners.entity';
import { Districts } from '../common/entities/districts.entity';
import { Facility_Types } from '../common/entities/facility_types.entity';
import { Operational_Status } from '../common/entities/operational_status.entity';
import { Regulatory_Status } from '../common/entities/regulatory_status.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FacilityBasicDetailsMetaDataService {

    constructor(@InjectRepository(Owners) private readonly ownersRepository: Repository<Owners>,
                @InjectRepository(Districts) private readonly districtsRepository: Repository<Districts>,
                @InjectRepository(Facility_Types) private readonly facilityTypesRepository: Repository<Facility_Types>,
                @InjectRepository(Operational_Status) private readonly operationalStatusRepository: Repository<Operational_Status>,
                @InjectRepository(Regulatory_Status) private readonly regulatoryStatusRepository: Repository<Regulatory_Status>) {}

    async getFacilityBasicDetailsMetaDataDto(): Promise<FacilityBasicDetailsMetaDataDto> {
        return{
            districts:              await this.getDistricts(),
            facilityTypes:          await this.getFacilityTypes(),
            operationalStatuses:    await this.getOperationalStatus(),
            owners:                 await this.getFacilityOwners(),
            regulatoryStatus:       await this.getRegulationStatus(),
        };
    }

    private async getFacilityTypes(): Promise<any> {
        const facilityTypeFromDatabase = await this.facilityTypesRepository.find({select: ['id', 'facility_type', 'description']});
        return facilityTypeFromDatabase.map((ft) => {
            return {
                name: ft.facility_type,
                description: ft.description,
                id: ft.id,
            };
        });
    }

    private async getFacilityOwners(): Promise<any[]> {
        const facilityOwnersFromDatabase = await this.ownersRepository.find({select: ['id', 'facility_owner', 'description']});
        return facilityOwnersFromDatabase.map((fo) => {
            return {
                name: fo.facility_owner,
                description: fo.description,
                id: fo.id,
            };
        });
    }

    private async getDistricts(): Promise<any[]>  {
        const districtsFromDatabase = await this.districtsRepository.find({select: ['id', 'district_name']});
        return districtsFromDatabase.map((dst) => {
            return{
                name: dst.district_name,
                id: dst.id,
            };
        });
    }

    private async getOperationalStatus(): Promise<any[]>  {
        const operationalStatusesFromDatabase = await
        this.operationalStatusRepository.find({select: ['id', 'description', 'facility_operational_status']});
        return operationalStatusesFromDatabase.map((ost) => {
            return {
                name: ost.facility_operational_status,
                description: ost.description,
                id: ost.id,
            };
        });
    }

    private async getRegulationStatus(): Promise<any[]>  {
        const regulatoryStatusFromDatabase = await
         this.regulatoryStatusRepository.find({select: ['id', 'description', 'facility_regulatory_status']});
        return regulatoryStatusFromDatabase.map((rst) => {
            return {
                name: rst.facility_regulatory_status,
                description: rst.description,
                id: rst.id,
            }
        });
    }
}
