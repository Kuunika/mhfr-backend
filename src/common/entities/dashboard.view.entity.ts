import {ViewEntity, ViewColumn} from "typeorm";
@ViewEntity({ 
    expression: `
    SELECT 
	districts.id as district_id,
	districts.district_name as district_name,
    districts.district_code as district_code,
    (SELECT 
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, facility__types
    WHERE 
		facilities.facilityTypeId = facility__types.id
        AND
        facilities.districtId = district_id
		AND
		facility__types.facility_type = 'District Hospital') 
	AS 'district_hospital',
    
    (SELECT 
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, facility__types
    WHERE 
		facilities.facilityTypeId = facility__types.id
        AND
        facilities.districtId = district_id
		AND
		facility__types.facility_type = 'Health Centre') 
	AS 'health_centre',
    
    (SELECT 
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, facility__types
    WHERE 
		facilities.facilityTypeId = facility__types.id
        AND
        facilities.districtId = district_id
		AND
		facility__types.facility_type = 'Dispensary') 
	AS 'dispensary',
    
    (
    SELECT 
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, facility__types
    WHERE 
		facilities.facilityTypeId = facility__types.id
        AND
        facilities.districtId = district_id
		AND
		facility__types.facility_type = 'Health Post'
	) 
	AS 'health_post',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, operational__status
    WHERE 
		facilities.facilityOperationalStatusId = operational__status.id
        AND
        facilities.districtId = district_id
		AND
		operational__status.facility_operational_status = 'Functional'
    ) as 'functional',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, operational__status
    WHERE 
		facilities.facilityOperationalStatusId = operational__status.id
        AND
        facilities.districtId = district_id
		AND
		operational__status.facility_operational_status = 'Closed'
    ) as 'closed',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, operational__status
    WHERE 
		facilities.facilityOperationalStatusId = operational__status.id
        AND
        facilities.districtId = district_id
		AND
		operational__status.facility_operational_status = 'Closed (Temporary)'
    ) as 'closed_temporary',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, regulatory__status
    WHERE 
		facilities.facilityRegulatoryStatusId = regulatory__status.id
        AND
        facilities.districtId = district_id
		AND
		regulatory__status.facility_regulatory_status in ('Registered')
    ) as 'registered',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, regulatory__status
    WHERE 
		facilities.facilityRegulatoryStatusId = regulatory__status.id
        AND
        facilities.districtId = district_id
		AND
		regulatory__status.facility_regulatory_status in ('Registered (Pending Certification)','Registration suspended','Registration cancelled')
    ) as 'pending',
    
    (
    SELECT
		COUNT(facilities.facility_id) as facilities 
	FROM
		facilities, regulatory__status
    WHERE 
		facilities.facilityRegulatoryStatusId = regulatory__status.id
        AND
        facilities.districtId = district_id
		AND
		regulatory__status.facility_regulatory_status in ('Not Registered')
    ) as 'not_registered'
FROM
	districts
    `
})
export class DashboardView {

    @ViewColumn()
    district_id: number;

    @ViewColumn()
    district_name: string;

    @ViewColumn()
    district_code: string;

    @ViewColumn()
    district_hospital: number;

    @ViewColumn()
    health_centre: number;

    @ViewColumn()
    dispensary: number;

    @ViewColumn()
    health_post: number;

    @ViewColumn()
    functional: number;

    @ViewColumn()
    closed: number;

    @ViewColumn()
    closed_temporary: number;

    @ViewColumn()
    registered: number;

    @ViewColumn()
    pending: number;

    @ViewColumn()
    not_registered: number;

}