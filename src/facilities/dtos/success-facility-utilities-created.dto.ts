export interface SuccessFacilityUtilitiesCreatedDto {
    message: string;
    facilityCode: string;
    createdEntities: CreatedEntity[];
    nonExistingEntities: number[];
    duplicateEntities: number[];
}

export interface CreatedEntity {
    utilityId: number;
    utilityType: string;
}
