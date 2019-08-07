import * as Joi from '@hapi/joi';

const createOwnerSchema = Joi.object().keys({
    facility_owner: Joi.string().required(),
    description: Joi.string().required(),
});

export default createOwnerSchema;
