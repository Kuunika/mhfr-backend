export interface FacilityContactDto {
    summary: {
        district: string;
        lastUpdated: Date;
        operationalStatus: string;
        oldMOHCode: string;
        name: string;
        commonName: string;
    },
    contactDetails: {
        contactPerson: string;
        contactEmail: string;
        contactPhone: string;
        catchmentArea: string;
        catchmentPopulation: number;
        latitude: number;
        longitude: number;
        postalAddress: string;
    },
}
