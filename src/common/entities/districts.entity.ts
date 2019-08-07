import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import {Facilities} from './facilities.entity';
import { Zones } from './zones.entity';

@Entity()
export class Districts{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    distric_name: string;

    @ManyToOne(type => Zones, zones => zones.district)
    zone: Zones;

    @OneToMany(type => Facilities, facilities => facilities.district)
    facility: Facilities[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}