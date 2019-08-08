import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Services } from './services.entity';
import { Facilities } from "./facilities.entity";

@Entity()
export class Facility_Services{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Services, services => services.facility_services)
    services: Services;

    @ManyToOne(type => Facilities, facilities => facilities.facility_services)
    facility: Facilities;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
