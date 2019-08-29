import * as Joi from '@hapi/joi';

const createFacilityContactDetails = Joi.object().keys({
    contactPerson:       Joi.string().min(2).max(255).required(),
    contactEmail:        Joi.string().max(255).email().required(),
    contactPhone:        Joi.string().min(8).max(13).required(),
    catchmentArea:       Joi.string().valid(['rural', 'urban']).required(),
    catchmentPopulation: Joi.number().min(1).max(10_000_000_000).required(),
    latitude:            Joi.number().min(-90).max(90).required(),
    longitude:           Joi.number().min(-180).max(180).required(),
    physicalAddress:     Joi.string().min(3).max(255).required(),
    postalAddress:       Joi.string().min(3).max(255).required(),
});

export default createFacilityContactDetails;