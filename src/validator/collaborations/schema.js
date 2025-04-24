import Joi from "joi";

export const CollaborationPayloadSchema = Joi.object({
    noteId: Joi.string().required(),
    userId: Joi.string().required()
})