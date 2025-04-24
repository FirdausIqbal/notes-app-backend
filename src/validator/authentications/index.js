import { InvariantError } from "../../exceptions/InvariantError.js";
import { PutAuthenticationPayloadSchema, PostAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema } from "./schema.js";

export const AuthenticationValidator = {
    validatePostAuthentication: (payload) => {
        const validationResult = PostAuthenticationPayloadSchema.validate(payload);
        if(validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    },
    validatePutAuthentication : (payload) => {
        const validationResult = PutAuthenticationPayloadSchema.validate(payload)
        if(validationResult.error){
            throw new InvariantError(validationResult.error.message)
        }
    },
    validateDeleteAuthentication: (payload) => {
        const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);
        if(validationResult.error){
            throw new InvariantError(validationResult.error.message)
        }
    }
}