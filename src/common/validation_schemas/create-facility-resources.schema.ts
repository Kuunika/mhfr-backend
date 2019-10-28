import * as Joi from '@hapi/joi';

const createFacilityResourceSchema = Joi.object().keys({
    resources: Joi.array().items(Joi.object().keys(
       { 
            id: Joi.number().greater(0).required(),
            quantity: Joi.number().greater(0).required(),
            description: Joi.string().required(),
       },
    )),
});

export default createFacilityResourceSchema;
