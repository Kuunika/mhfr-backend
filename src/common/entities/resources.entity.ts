import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Resource_Type } from './resource_type.entity';
import { Facility_Resources } from './facility_resources.entity';

@Entity()
export class Resources{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resource_name: string;

    @Column()
    description: string;

    @ManyToOne(type => Resource_Type, resource_type => resource_type.resource)
    resource_type: Resource_Type;

    @OneToMany(type => Facility_Resources, facility_resources => facility_resources.resources)
    facility_resources: Facility_Resources[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
