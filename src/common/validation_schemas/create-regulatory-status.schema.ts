import * as Joi from '@hapi/joi';

const createRegulationStatusSchema = Joi.object().keys({
    facility_regulatory_status: Joi.string().required(),
    description: Joi.string().required(),
});

export default createRegulationStatusSchema;
