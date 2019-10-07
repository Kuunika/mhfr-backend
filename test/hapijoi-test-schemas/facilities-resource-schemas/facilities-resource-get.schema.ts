import * as Joi from '@hapi/joi';

const facilitiesResourcesDtoSchema = Joi.object().keys({
    "resourceTypes": Joi.array().required(),
});

export default facilitiesResourcesDtoSchema;