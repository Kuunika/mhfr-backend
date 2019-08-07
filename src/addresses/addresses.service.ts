import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {Addresses} from '../common/entities/addresses.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressesService {
    constructor(@InjectRepository(Addresses) private readonly addresssesService: Repository<Addresses>) {}
}
