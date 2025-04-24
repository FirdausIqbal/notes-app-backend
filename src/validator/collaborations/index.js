import { InvariantError } from "../../exceptions/InvariantError.js";
import { CollaborationPayloadSchema } from "./schema.js";

export const CollaborationValidator = {
    validateCollaborationPayload: (payload) => {
        const validateResult = CollaborationPayloadSchema.validate(payload)
        if(validateResult.error){
            throw new InvariantError(validateResult.error.message)
        }
    }
}