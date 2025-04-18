/* eslint-disable no-unused-vars */
import { nanoid } from 'nanoid';
import pg from 'pg';
import { InvariantError } from '../../exceptions/InvariantError.js';
import { mapDBToModel } from '../../utils/index.js';
import { NotFoundError } from '../../exceptions/NotFoundError.js';

export class NoteService {
    constructor() {
        this._pool = new pg.Pool()
    }

    async addNote({title, body, tags}){
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updateAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updateAt]
        }

        const result = await this._pool.query(query);

        if(!result.rows[0].id){
            throw new InvariantError('Catatan gagal ditambahkan')
        }

        return result.rows[0].id;
    }

    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes')
        return result.rows.map(mapDBToModel)
    }

    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }

        return result.rows.map(mapDBToModel)[0];
    }

    async editNoteById(id, {title, body, tags}) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_At = $4 WHERE id = $5 RETURNING id',
            values: [title, body, tags, updatedAt, id]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui note')
        }
    }

    async deleteNoteById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan')
        }
    }
}