import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Utilities } from "./utilities.entity";
import { Facilities } from "./facilities.entity";

@Entity()
export class Facility_Utilities{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Utilities, utility => utility.facility_utilities);
    utility: Utilities;

    @OneToMany(type => Facilities, facilities => facilities.facility_utilities)
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
