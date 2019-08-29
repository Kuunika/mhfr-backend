import {ManyToOne, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Locations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    catchment_area: string;

    @Column({type: 'bigint'})
    catchment_population: number;

    @OneToOne(type => Facilities, facility => facility.address)
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
