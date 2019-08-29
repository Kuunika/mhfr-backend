import * as Joi from '@hapi/joi';

const createFacilitySchema  = Joi.object().keys({
    name: Joi.string().required(),
    commonName: Joi.string().required(),
    ownerId: Joi.number().greater(0).required(),
    facilityTypeId: Joi.number().greater(0).required(),
    operationalStatusId: Joi.number().greater(0).required(),
    registrationStatusId: Joi.number().greater(0).required(),
    districtId: Joi.number().greater(0).required(),
    dateOpened: Joi.date().required(),
    registrationNumber: Joi.string().required(),
    // TODO: Make the validation also apply for the items within the array
    codeMap: Joi.array().optional(),
});

export default createFacilitySchema;
