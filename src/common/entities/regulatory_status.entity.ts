import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Regulatory_Status{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    facility_regulatory_status: string;

    @Column({type: 'text'})
    description: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @OneToMany(type => Facilities, facilities => facilities.facility_regulatory_status)
    facility: Facilities[];
}
