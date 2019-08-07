import * as Joi from '@hapi/joi';

const createFacilitySchema  = Joi.object().keys({
    facility_name: Joi.string().required(),
    facility_code: Joi.string().required(),
    facility_date_opened: Joi.date().required(),
    facility_type_id: Joi.number().required(),
    facility_owner_id: Joi.number().required(),
    facility_operational_status_id: Joi.number().required(),
    facility_regulatory_status_id: Joi.number().required(),
    district_id: Joi.number().required(),
});

export default createFacilitySchema;
