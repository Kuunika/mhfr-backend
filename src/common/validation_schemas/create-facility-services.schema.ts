import * as Joi from '@hapi/joi';

const createFacilityServiceSchema = Joi.object().keys({
    serviceIds: Joi.array().items(Joi.number()),
});

export default createFacilityServiceSchema;
