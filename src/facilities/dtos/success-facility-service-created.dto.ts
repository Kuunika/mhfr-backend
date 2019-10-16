export interface SuccessFacilityServiceCreatedDto {
    message: string;
    facilityCode: string;
    createdEntities: CreatedEntity[];
    nonExistingEntities: number[];
    duplicateEntities: number[];
}

export interface CreatedEntity {
    serviceId: number;
    serviceType: string;
}
