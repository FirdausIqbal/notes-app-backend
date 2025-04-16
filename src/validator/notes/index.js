import { InvariantError } from "../../exceptions/InvariantError.js"
import { NotepayloadSchema } from "./schema.js"

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validateResult = NotepayloadSchema.validate(payload)
        if(validateResult.error) {
            throw new InvariantError(validateResult.error.message)
        }
    }
}

export { NotesValidator }