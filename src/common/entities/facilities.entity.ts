import {ManyToOne, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import {Facility_Types} from './facility_types.entity';
import { Owners } from './owners.entity';
import {Operational_Status} from './operational_status.entity';
import {Regulatory_Status} from './regulatory_status.entity';
import { Districts } from './districts.entity';
import { Facility_Utilities } from './facility_utilities.entity';
import { Facility_Resources } from './facility_resources.entity';
import { Facility_Services } from './facility_services.entity';
import { Contact_People } from './contact_people.entity';
import { Locations} from './locations.entity';
import { Addresses } from './addresses.entity';
import { Geolocations } from './geolocations.entity';

@Entity()
export class Facilities{

    @PrimaryGeneratedColumn()
    facility_id: number;

    @Column()
    facility_name: string;

    @Column()
    common_name: string;

    @Column()
    facility_code: string;

    @Column()
    facility_date_opened: Date;

    @Column({ type: 'json', nullable: true })
    facility_code_mapping: object;

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

    @OneToMany(type => Facility_Utilities, facility_utilities => facility_utilities.facility)
    facility_utilities: Facility_Utilities[];

    @OneToMany(type => Facility_Resources, facility_resources => facility_resources.facility)
    facility_resources: Facility_Resources[];

    @OneToMany(type => Facility_Services, facility_services => facility_services.facility)
    facility_services: Facility_Services[];

    @OneToOne(type => Locations, locations => locations.facility, {cascade: true})
    @JoinColumn()
    location: Locations;

    @OneToOne(type => Geolocations, geolocations => geolocations.facility, {cascade: true})
    @JoinColumn()
    geolocation: Geolocations;

    @OneToOne(type => Contact_People, contact_people => contact_people.facility, {cascade: true})
    @JoinColumn()
    contact_people: Contact_People;

    @OneToOne(type => Addresses, addesses => addesses.facility, {cascade: true})
    @JoinColumn()
    address: Addresses;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    details_updated_at: Date;
    

}
