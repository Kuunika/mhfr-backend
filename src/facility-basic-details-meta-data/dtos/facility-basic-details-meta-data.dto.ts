export interface FacilityBasicDetailsMetaDataDto {
    owners: Array<{
        name: string,
        description: string,
        id: number,
    }>;

    districts: Array<{
        name: string,
        id: number,
    }>;

    facilityTypes: Array<{
        name: string,
        description: string,
        id: number,
    }>;

    operationalStatuses: Array<{
        name: string,
        description: string,
        id: number,
    }>;

    regulatoryStatus: Array<{
        name: string,
        description: string,
        id: number,
    }>;
}