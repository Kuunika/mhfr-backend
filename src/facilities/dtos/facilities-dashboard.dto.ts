export class FacilitiesDashboardDto {
    totalFacilities: number;
    districtHospitals: number;
    healthCenters: number;
    dispensaries: number;
    healthPosts: number;
    licenseStatus: {
        registered: number;
        pending: number;
        notRegistered: number;
    };
    operationalStatus: {
        functional: number;
        closedTemp: number;
        closed: number;
    };
}
