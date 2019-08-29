export interface CreateFacilityContactDto {
    contactPerson:       string;
    contactEmail:        string;
    contactPhone:        string;
    catchmentArea:       string;
    catchmentPopulation: number;
    latitude:            number;
    longitude:           number;
    physicalAddress:     string;
    postalAddress:       string;
}
