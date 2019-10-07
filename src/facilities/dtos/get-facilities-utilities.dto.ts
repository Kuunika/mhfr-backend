import {Summary} from '../interfaces/facility-summary.interface';

export interface GetFacilitiesUtilitiesDto {
    summary:   Summary;
    utilities: Utilities;
}

export interface Utilities {
    utilityTypes: UtilityType[];
}

export interface UtilityType {
    name:      string;
    utilities: string[];
}
