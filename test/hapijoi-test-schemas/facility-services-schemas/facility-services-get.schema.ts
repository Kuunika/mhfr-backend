import * as Joi from '@hapi/joi';

const facilityResourcesDtoSchema = Joi.object().keys({
    summary:   Joi.object().required(),
    services: Joi.object().required(),
});

export default facilityResourcesDtoSchema;
