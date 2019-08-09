import { Facilities } from './facilities.entity';
import { OneToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, Entity, JoinColumn } from 'typeorm';

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    physical_address: string;

    @Column()
    postal_address: string;

    @OneToOne(type => Facilities)
    @JoinColumn()
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
