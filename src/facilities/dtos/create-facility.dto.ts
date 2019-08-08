import { Facility_Types } from '../../common/entities/facility_types.entity';
import { Owners } from '../../common/entities/owners.entity';
import { Operational_Status } from '../../common/entities/operational_status.entity';
import { Regulatory_Status } from '../../common/entities/regulatory_status.entity';
import { Districts } from '../../common/entities/districts.entity';

export class CreateFacilityDto {
    facility_name: string;
    facility_code: string;
    facility_date_opened: Date;
    facility_type: Facility_Types;
    facility_owner: Owners;
    facility_operational_status: Operational_Status;
    facility_regulatory_status: Regulatory_Status;
    district: Districts;
}
