import {Summary} from '../interfaces/facility-summary.interface';

export interface GetFacilityServiceDto {
    summary:   Summary;
    services: Services;
}

export interface Services {
    serviceTypes: ServiceType[];
}

export interface ServiceType {
    name:        string;
    subservices: Subservices;
}

export interface Subservices {
    name:        string;
    subservices: string[];
}
