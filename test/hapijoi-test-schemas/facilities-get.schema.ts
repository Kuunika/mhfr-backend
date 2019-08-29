import * as Joi from '@hapi/joi';

const facilitiesDtoSchema = Joi.object().keys({
    "id": Joi.number().min(1).required(),
    "code": Joi.string().required(),
    "name": Joi.string().required(),
    "commonName": Joi.string().required(),
    "ownership": Joi.string().required(),
    "type": Joi.string().required(),
    "status": Joi.string().valid(['functional', 'closed', 'closedTemp']).required(),
    "district": Joi.string().required(),
    "dateOpened": Joi.date(),
});

export default facilitiesDtoSchema;
