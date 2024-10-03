import { nanoid } from "nanoid";
import { notes } from "../../notes.js";

export const addNotes = async (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newDataNote = { id, title, body, tags, createdAt, updatedAt };
  notes.push(newDataNote);

  const isSuccess = notes.filter((item) => item.id === id).length > 0;
  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id,
        },
      })
      .code(201);
    return response;
  } else {
    const response = h
      .response({
        status: "fail",
        message: "Cataran gagal ditambahkan",
      })
      .code(500);
    return response;
  }
};

export const getNotes = async (request, h) => {
    const response = h.response({
        status: 'success',
        data: notes
    })
    return response;
}

export const getNoteById = async (request , h) => {
    const {id} = request.params;
    const resData = notes.filter((item) => item.id === id)[0];
    const response = h.response({
        status: 'success',
        data: resData
    }).code(201);
    return response;
}

export const updateNote = async (request, h) => {
    const {title, body, tags} = request.payload;
    const {id} = request.params;

    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((item) => item.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            id,
            title,
            body,
            tags,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Data berhasil di perbarui'
        }).code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Gagal memperbarui data note'
        }).code(500);
        return response;
    }

}

export const deleteNote = async (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((item) => item.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Berhasil menghapus note'
        }).code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Gagal menghapus note'
        }).code(500);
        return response;
    }
    
}
