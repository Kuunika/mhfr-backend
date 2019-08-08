import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Facilities } from "./facilities.entity";
import { Resources } from "./resources.entity";

@Entity()
export class Facility_Resources{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @ManyToOne(type => Facilities, facilities => facilities.facility_resources)
    facility: Facilities;

    @ManyToOne(type => Resources, resources => resources.facility_resources)
    resources: Resources;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}