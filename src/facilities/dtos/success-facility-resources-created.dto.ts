export interface SuccessFacilityResourcesCreatedDto {
    message: string;
    facilityCode: string;
    createdEntities: CreatedEntity[];
    nonExistingEntities: number[];
    duplicateEntities: number[];
}

export interface CreatedEntity {
    resourceId: number;
    resource: string;
    quantity: number;
}
