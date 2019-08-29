export function createLicenseStatusObject(licenseStatusObject) {
    const licenseStatus = {
        registered: 0,
        pending: 0,
        notRegistered: 0,
    };

    licenseStatusObject.forEach(facilityReg => {
        switch (facilityReg.regulatory_status) {
            case 'Registered':
                licenseStatus.registered += parseInt(facilityReg.number_of_facilities, 10);
                break;
            case 'Registered (Pending Certification)':
                licenseStatus.registered += parseInt(facilityReg.number_of_facilities, 10);
                break;
            case 'Pending':
                licenseStatus.pending += parseInt(facilityReg.number_of_facilities, 10);
                break;
            case 'Not Registered':
                licenseStatus.notRegistered += parseInt(facilityReg.number_of_facilities, 10);
                break;
            case 'Registration cancelled':
                licenseStatus.notRegistered += parseInt(facilityReg.number_of_facilities, 10);
                break;
            default:
                break;
        }
    });

    return licenseStatus;
}

export function  createOperationalStatusObject(operationStatusObject) {
    const operationalStatus = {
        functional: 0,
        closedTemp: 0,
        closed: 0,
    };

    operationStatusObject.forEach(status => {
        switch (status.operationalStatus) {
            case 'functional':
                operationalStatus.functional = parseInt(status.number_of_facilities, 10);
                break;
            case 'closedTemp':
                operationalStatus.closedTemp =  parseInt(status.number_of_facilities, 10);
                break;
            case 'closed':
                operationalStatus.closed =  parseInt(status.number_of_facilities, 10);
                break;
            default:
                break;
        }
    });

    return operationalStatus;
}

export function createFacilityTypesObject(facilityTypesObject) {
    const facilityTypes = {
        districtHospitals: 0,
        healthCenters: 0,
        dispensaries: 0,
        healthPosts: 0,
    };

    facilityTypesObject.forEach(facilityType => {
        switch (facilityType.type_of_facility) {
            case 'District Hospitals':
                facilityTypes.districtHospitals = parseInt(facilityType.number_of_facilities, 10);
                break;
            case 'Health Centers':
                facilityTypes.healthCenters =  parseInt(facilityType.number_of_facilities, 10);
                break;
            case 'Dispensary':
                facilityTypes.dispensaries =  parseInt(facilityType.number_of_facilities, 10);
                break;
            case 'Health Posts':
                facilityTypes.healthPosts =  parseInt(facilityType.number_of_facilities, 10);
                break;
            default:
                break;
        }
    });

    return facilityTypes;
}
