import { Injectable, NotImplementedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from '../common/entities/facilities.entity';
import { Repository } from 'typeorm';
import { CreateFacilityDto } from '../common/dtos/create-facility.dto';
import * as mappingHelper from '../common/helpers/object-mapping.helper';

@Injectable()
export class FacilitiesService {
    constructor(@InjectRepository(Facilities) private readonly facilitiesRepository: Repository<Facilities>) {}

    async getAllFacilities(): Promise<Facilities[]> {
        return await this.facilitiesRepository.find({relations: ['district', 'facility_type', 'facility_operational_status', 'facility_owner']});
    }

    async getFacility(id: number): Promise<Facilities> {
        const facility = await this.facilitiesRepository.findOne(id);

        if (facility) { return facility; }

        throw new HttpException('Facility Not Found', HttpStatus.NOT_FOUND);
    }

    async createFacility(createFacilityDto: CreateFacilityDto): Promise<Facilities> {
        const facility = mappingHelper.objectMapping(CreateFacilityDto, new Facilities());
        return await this.facilitiesRepository.save(facility);
    }
}
