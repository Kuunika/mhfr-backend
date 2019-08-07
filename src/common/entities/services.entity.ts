import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Service_Type } from './service_types.entity';
import { Facilities } from './facilities.entity';

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

    @ManyToMany(type => Facilities, facilities => facilities.services)
    facilities: Facilities[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
