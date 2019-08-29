import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity()
export class FacilityTypeDashboardAggregate {

    @ViewColumn()
    facility_type: string;

    @ViewColumn()
    number_of_facilities: number;

}
