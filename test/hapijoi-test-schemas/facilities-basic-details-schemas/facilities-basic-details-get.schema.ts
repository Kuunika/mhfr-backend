import * as Joi from '@hapi/joi';

const facilityBasicDetailsDtoSchema = Joi.object().keys({
    commonName: Joi.string().required(),
    code:       Joi.string().required(),
    lastUpdated: Joi.string().required(),
    dateOpened: Joi.string().required(),
    ownership:  Joi.string().required(),
    district:   Joi.string().required(),
    name:       Joi.string().required(),
    status:     Joi.string().required(),
    type:       Joi.string().required(),
    id:         Joi.number().required(),
    codeMap:    Joi.required(),
});

export default facilityBasicDetailsDtoSchema;
