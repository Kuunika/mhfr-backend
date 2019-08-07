import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import {Facilities} from './facilities.entity';

@Entity()
export class Contact_People{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contact_person_fullname: string;

    @Column()
    contact_person_phone: string;

    @Column()
    contact_person_email: string;

    @OneToOne(type => Facilities)
    facility: Facilities;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
