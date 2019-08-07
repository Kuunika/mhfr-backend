import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import {Services} from './services.entity';

@Entity()
export class Service_Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_type: string;

    @Column({type: 'text'})
    description: string;

    @OneToMany(type => Services, services => services.service_type)
    service: Services[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}