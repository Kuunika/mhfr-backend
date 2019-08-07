import * as Joi from '@hapi/joi';

const createFacilityType = Joi.object().keys({
    facility_type: Joi.string().required(),
    description: Joi.string().required(),
});

export default createFacilityType;