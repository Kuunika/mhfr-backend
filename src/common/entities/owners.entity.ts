import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Owners{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    facility_owner: string;

    @Column()
    description: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @OneToMany(type => Facilities, facilities => facilities.facility_owner)
    facility: Facilities[];
}