import * as Joi from '@hapi/joi';

const facilitiesDtoSchema = Joi.object().keys({
    "id": Joi.number().min(1).required(),
    "code": Joi.string().allow('').allow(null),
    "name": Joi.string().required(),
    "commonName": Joi.string().allow('').allow(null),
    "ownership": Joi.string().required(),
    "type": Joi.string().required(),
    "status": Joi.string().valid(['Functional', 'Pending Operation (Under construction)'
                                , 'Pending Operation (Construction Complete)', 'Closed', 'Non-functional'
                                , 'Closed (Temporary)']).required(),
    "district": Joi.string().required(),
    "dateOpened": Joi.date(),
});

export default facilitiesDtoSchema;
