export interface CreateFacilityResourcesDto {
    resources: Resource[];
}

export interface Resource {
    id: number;
    quantity: number;
    description: string;
}
