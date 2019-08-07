import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Facilities } from "./facilities.entity";
import { Resources } from "./resources.entity";

@Entity()
export class Facility_Resources{

    @PrimaryGeneratedColumn()
    id: number;

    quantity: number;

    description: string;

    @OneToMany(type => Facilities, facilities => facilities.facility_resources)
    facility: Facilities;

    @OneToMany(type => Resources, resources => resources.facility_resources)
    resources: Resources;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
