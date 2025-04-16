import Joi from "joi";

const NotepayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()).required()
})

export { NotepayloadSchema }