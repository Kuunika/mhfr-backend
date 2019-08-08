import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Utility_Type } from './utility_types.entity';
import { Facility_Utilities } from './facility_utilities.entity';

@Entity()
export class Utilities{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    utility_name: string;

    @Column()
    description: string;

    @ManyToOne(type => Utility_Type, utility_type => utility_type)
    utility_type: Utility_Type;

    @OneToMany(type => Facility_Utilities, facility_utilities => facility_utilities.utility)
    facility_utilities: Facility_Utilities[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
