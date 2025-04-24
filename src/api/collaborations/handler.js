export class CollaborationHandler {
    constructor(collaborationService, noteService, validator) {
        this._collaborationService = collaborationService
        this._noteService = noteService
        this._validator = validator
    }

    async postCollaborationHandler(request, h) {
        this._validator.validateCollaborationPayload(request.payload)

        const {id: credentialId} = request.auth.credentials;
        const {noteId, userId} = request.payload;

        await this._noteService.verifyNoteOwner(noteId, credentialId)

        const collaborationId = await this._collaborationService.addCollaboration(noteId, userId)

        const response = h.response({
            status: 'success',
            message: 'Kolaborasi berhasil ditambahkan',
            data: {
                collaborationId
            }
        }).code(201)

        return response;
    }

    async deleteCollaborationHandler(request, h) {
        this._validator.validateCollaborationPayload(request.payload)

        const {id: credentialId} = request.auth.credentials;
        const {noteId, userId} = request.payload;

        await this._noteService.verifyNoteOwner(noteId, credentialId);
        await this._collaborationService.deleteCollaboration(noteId, userId)

        const response = h.response({
            status: 'success',
            message: 'Kolaborasi berhasil dihapus'
        })
        return response
    }
}