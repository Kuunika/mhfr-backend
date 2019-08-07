import { Facilities } from "./facilities.entity";
import { OneToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    physical_address: string;

    @Column()
    postal_address: string;

    @OneToOne(type => Facilities)
    facility: Facilities;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
