import { nanoid } from "nanoid";
import { InvariantError } from "../../exceptions/InvariantError.js";
import { NotFoundError } from "../../exceptions/NotFoundError.js";

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;
    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updateAt,
    };

    this._notes.push(newNote);
    const isSucces = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSucces) {
      throw new InvariantError("Catatan gagal ditambahkan")
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((note) => note.id === id)[0];
    if (!note) {
      throw new NotFoundError("Catatan tidak ditembukan");
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui note");
    }

    const updateAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      id,
      title,
      body,
      tags,
      updateAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex(note => note.id === id);
    if(index === -1) {
        throw new NotFoundError("Catatan tidak ditemukan")
    }
    this._notes.splice(index, 1)
  }
}

export { NotesService };
