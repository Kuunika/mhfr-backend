import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Facility_Types {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    facility_type: string;

    @Column({type: 'text'})
    description: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @OneToMany(type => Facilities, facilities => facilities.facility_type)
    facility: Facilities[];
}
