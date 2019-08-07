import {ManyToOne, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import {Facility_Types} from './facility_types.entity';
import { Owners } from './owners.entity';
import {Operational_Status} from './operational_status.entity';
import {Regulatory_Status} from './regulatory_status.entity';
import { Districts } from './districts.entity';
import { Geolocations } from './geolocations.entity';
import {Addresses} from './addresses.entity';
import { Utilities } from './utilities.entity';
import { Resources } from './resources.entity';
import {Services} from './services.entity';
import { Facility_Utilities } from './facility_utilities.entity';
import { Facility_Resources } from './facility_resources.entity';


@Entity()
export class Facilities{

    @PrimaryGeneratedColumn()
    // tslint:disable-next-line: variable-name
    facility_id: number;

    @Column()
    facility_name: string;

    @Column()
    facility_code: string;

    @Column()
    facility_date_opened: Date;

    @ManyToOne(type => Facility_Types, facilities_types => facilities_types.facility, {cascade: true})
    facility_type: Facility_Types;

    @ManyToOne(type => Owners, owners => owners.facility, {cascade: true})
    facility_owner: Owners;

    @ManyToOne(type => Operational_Status, operational_status => operational_status.facility, {cascade: true})
    facility_operational_status: Operational_Status;

    @ManyToOne(type => Regulatory_Status, regulatory_status => regulatory_status.facility, {cascade: true})
    facility_regulatory_status:Regulatory_Status;

    @ManyToOne(type => Districts, districts => districts.facility, {cascade: true})
    district: Districts;

    @ManyToOne(type => Facility_Utilities, facility_utilities => facility_utilities.facility)
    facility_utilities: Facility_Utilities[];

    @ManyToOne(type => Facility_Resources, facility_resources => facility_resources.facility)
    facility_resources: Facility_Resources[];

/*
    @ManyToMany(type => Utilities, utilities => utilities.facilities)
    @JoinTable({name: 'facilities_utilities'})
    utilities: Utilities[];

    @ManyToMany(type => Services, services => services.facilities)
    @JoinTable({name: 'facilities_services'})
    services: Services[];

    @ManyToMany(type => Resources, resources => resources.facilities)
    @JoinTable({name: 'facilities_resources'})
    resources: Resources[];
*/
    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    details_updated_at: Date;

    @Column({ type: 'json', nullable: true })
    facility_code_mapping: object;
}