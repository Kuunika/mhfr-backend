import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Districts } from '../../common/entities/districts.entity';
import { Facilities } from '../../common/entities/facilities.entity';

@Injectable()
export class FacilityCodeService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>,
                @InjectRepository(Districts) private readonly districtsRepository: Repository<Districts>) {}

    public async createFacilityCode(district_id: number ): Promise<string> {
        const district = await this.districtsRepository.findOne(district_id);
        const facilities = await this.facilitiesRepository.findAndCount({where: {district, facility_code: Not('\'\'')}});

        const highest_occurrence = this.getHighestFacilityCodeOccurrence(facilities[0]);

        let facility_code_count;

        if (highest_occurrence) {
            facility_code_count = highest_occurrence + 1;
        } else {
            facility_code_count = facilities[1] + 1;
        }

        return `${district.district_code}${_.padStart(district_id.toString(), 2, '0')}${_.padStart((facility_code_count).toString(), 4, '0')}`;
    }

    private getHighestFacilityCodeOccurrence(facilities: Facilities[]) {
        return facilities.filter((facility) => facility.facility_code.length === 8)
                         .map((facility) => parseInt(facility.facility_code.slice(4), 10))
                         .sort((firstElement, secondElement) => (secondElement - firstElement))
                         .shift();
    }
}
