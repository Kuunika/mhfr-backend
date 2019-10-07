import * as Joi from '@hapi/joi';

const getDashboardDtoSchema = Joi.object().keys({
    totalFacilities: Joi.number().required(),
    districtHospitals: Joi.number().required(),
    healthCenters: Joi.number().required(),
    dispensaries: Joi.number().required(),
    healthPosts: Joi.number().required(),
    licenseStatus: Joi.object({
        registered: Joi.number().required(),
        pending: Joi.number().required(),
        notRegistered: Joi.number().required(),
    }).required(),
    operationalStatus: Joi.object({
        functional: Joi.number().required(),
        closedTemp: Joi.number().required(),
        closed: Joi.number().required(),
    }).required(),
});

export default getDashboardDtoSchema;