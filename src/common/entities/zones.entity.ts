import {Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Districts} from './districts.entity';

@Entity()
export class Zones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zone_name: string;

    @Column({type: 'text'})
    description: string;

    @OneToMany(type => Districts, districts => districts.zone)
    district:Districts;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
