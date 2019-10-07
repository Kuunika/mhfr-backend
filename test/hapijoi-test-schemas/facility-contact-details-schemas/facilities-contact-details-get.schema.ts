import * as Joi from '@hapi/joi';

const facilitiesContactDetailsDtoSchema = Joi.object().keys({
    "summary": Joi.object().keys({
        "district": Joi.string().required(),
        "lastUpdated": Joi.string().required(),
        "operationalStatus": Joi.string().required(),
        "oldMOHCode": Joi.string().required(),
        "name": Joi.string().required(),
        "commonName": Joi.string().required(),
    }).required(),
    "contactDetails": Joi.object().keys({
        "contactPerson": Joi.string().required(),
        "contactEmail": Joi.string().email().required(),
        "contactPhone": Joi.string().required(),
        "catchmentArea": Joi.string().required(),
        "catchmentPopulation": Joi.number().required(),
        "latitude": Joi.number().required(),
        "longitude": Joi.number().required(),
        "postalAddress": Joi.string().required(),
    }),
});

export default facilitiesContactDetailsDtoSchema;