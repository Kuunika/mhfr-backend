import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Utilities } from './utilities.entity';

@Entity()
export class Utility_Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    utility_type: string;

    @Column({type: 'text'})
    description: string;

    @OneToMany(type => Utilities, utilities => utilities.utility_type)
    resource: Utilities[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}