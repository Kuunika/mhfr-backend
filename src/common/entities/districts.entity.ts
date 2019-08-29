import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Facilities} from './facilities.entity';
import { Zones } from './zones.entity';

@Entity()
export class Districts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    district_name: string;

    @Column()
    district_code: string;

    @ManyToOne(type => Zones, zones => zones.district)
    @JoinColumn()
    zone: Zones;

    @OneToMany(type => Facilities, facilities => facilities.district)
    facility: Facilities[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
