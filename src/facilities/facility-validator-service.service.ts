import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { FacilityNotFoundException } from '../exceptions/facility-not-found.exception';

@Injectable()
export class FacilityValidatorServiceService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>) {}

    async getFacility(facility_code: string, relations: string[] = []): Promise<Facilities> {
        const facility = await this.facilitiesRepository.findOne({where: {facility_code}, relations});
        if (!facility) {
            throw new FacilityNotFoundException(facility_code);
            return null;
        }

        return facility;
    }
}
