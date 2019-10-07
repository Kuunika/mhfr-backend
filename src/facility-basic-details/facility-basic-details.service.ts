import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facilities} from '../common/entities/facilities.entity';
import { FacilityBasicDetailsDto } from './dtos/facility-basic-details.dto';
import { nullOrString } from '../common/helpers/null-or-string.helper';

@Injectable()
export class FacilityBasicDetailsService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>) {}

    async getFacilityBasicDetails(facility_code: string): Promise<FacilityBasicDetailsDto> {
        const facility = await this.facilitiesRepository.findOne({facility_code},
            {relations: ['district', 'facility_type', 'facility_operational_status', 'facility_owner']});
        if (!facility) { throw new HttpException('Facility Not Found', HttpStatus.NOT_FOUND); }

        return {
            commonName: facility.common_name || '',
            code:       facility.facility_code || '',
            lastUpdated: facility.updated_at,
            dateOpened: facility.facility_date_opened || null,
            ownership:  nullOrString(facility.facility_owner, 'facility_owner'),
            district:   nullOrString(facility.district, 'district_name'),
            name:       facility.facility_name || '',
            status:     nullOrString(facility.facility_operational_status, 'facility_operational_status'),
            type:       nullOrString(facility.facility_type, 'facility_type'),
            id:         facility.facility_id || 0,
            codeMap:    Object.values(facility.facility_code_mapping || []),
        };
    }
}
