import { Districts } from '../../common/entities/districts.entity';

export class CreateFacilityDto {
    name: string;
    commonName: string;
    ownerId: number;
    facilityTypeId: number;
    operationalStatusId: number;
    registrationStatusId: number;
    districtId: number;
    dateOpened: Date;
    registrationNumber: string;
    codeMap: any[];
}