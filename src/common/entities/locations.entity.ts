import {ManyToOne, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import {Facilities} from './facilities.entity';

export class Locations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    catchment_area: string;

    @Column({type: 'bigint'})
    catchment_population: number;

    @OneToOne(type => Facilities)
    @JoinColumn()
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
