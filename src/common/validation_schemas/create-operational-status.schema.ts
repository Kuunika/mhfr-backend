import * as Joi from '@hapi/joi';

const operationalStatus = Joi.object().keys({
    facility_operational_status: Joi.string().required(),
    description: Joi.string().required()
});

export default operationalStatus;
