import {Summary} from '../interfaces/facility-summary.interface';

export interface FacilitiesResourcesDto {
    summary: Summary;
    resourceTypes: ResourceType[];
}

export interface ResourceType {
    name: string;
    resources: Resource[];
}

export interface Resource {
    name: string;
    value: number;
}
