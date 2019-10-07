export interface FacilityBasicDetailsDto {
    id: number;
    code: string;
    name: string;
    commonName: string;
    ownership: string;
    type: string;
    status: string;
    district: string;
    lastUpdated: Date;
    dateOpened: Date;
    codeMap: any[];
}
