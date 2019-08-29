export interface FacilityBasicDetailsDto {
    id: number;
    code: string;
    name: string;
    commonName: string;
    ownership: string;
    type: string;
    status: string;
    district: string;
    dateOpened: Date;
    codeMap: any[];
}
