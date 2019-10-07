import { Injectable } from '@nestjs/common';
import { Facilities } from '../common/entities/facilities.entity';
import {Summary} from './interfaces/facility-summary.interface';

@Injectable()
export class FacilitiesSummaryHelper {
    public facilitySummary(facility: Facilities): Summary {
        const facilityCodeMapping = facility.facility_code_mapping[0]['code'];
        return {
            commonName: facility.common_name,
            district: facility.district.district_name,
            lastUpdated: facility.details_updated_at.toDateString(),
            name: facility.facility_name,
            // TODO: Assess in code review
            oldMOHCode: facilityCodeMapping && facilityCodeMapping !== '0' && facilityCodeMapping !== '-1' ? facilityCodeMapping : 'N/A',
            operationalStatus: facility.facility_operational_status.facility_operational_status,
        }
    }

}
