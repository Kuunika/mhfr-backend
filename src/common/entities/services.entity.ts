import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Service_Type } from './service_types.entity';
import { Facilities } from './facilities.entity';
import { Facility_Services } from './facility_services.entity';

@Entity()
export class Services {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_name: string;

    @Column()
    service_description: string;

    @ManyToOne(type => Service_Type, service_type => service_type.service)
    service_type: Service_Type;

    @OneToMany(type => Facility_Services, facility_services => facility_services.services)
    facility_services: Facility_Services[];

    @Column()
    service_category_id: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
