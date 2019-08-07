import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Resources } from './resources.entity';

@Entity()
export class Resource_Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resource_type: string;

    @Column({type: 'text'})
    description: string;

    @OneToMany(type => Resources, resources => resources.resource_type)
    resource: Resources[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
