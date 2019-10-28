import * as Joi from '@hapi/joi';

const facilitiesResourcesDtoSchema = Joi.object().keys({
    summary: Joi.object({
        commonName: Joi.string().required(),
        district: Joi.string().required(),
        lastUpdated: Joi.string().required(),
        name: Joi.string().required(),
        oldMOHCode: Joi.string().required(),
        operationalStatus: Joi.string().required(),
    }).required(),
    resourceTypes: Joi.array().items(Joi.object({
        name: Joi.string(),
        resources: Joi.array().items({
            name: Joi.string(),
            value: Joi.number(),
        }),
    })).required(),
});

export default facilitiesResourcesDtoSchema;
