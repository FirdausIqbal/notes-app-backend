import { addNotes, getNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteHandler.js"

export const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotes
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getNotes
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteById
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNote
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNote
    }
]