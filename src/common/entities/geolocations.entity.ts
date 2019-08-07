import {ManyToOne, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Geolocations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'bigint'})
    datum: number;

    @Column({type: 'decimal'})
    longitude: number;

    @Column({type: 'decimal'})
    latitude: number;

    @OneToOne(type => Facilities)
    @JoinColumn()
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
