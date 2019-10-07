import * as Joi from '@hapi/joi';

const facilitiesUtilitiesDtoSchema = Joi.object().keys({
    summary:   Joi.object().required(),
    utilities: Joi.object().required(),
});

export default facilitiesUtilitiesDtoSchema;