import Hapi from "@hapi/hapi";
// import { routes } from "./routes/routes.js";
import notes from "./api/notes/index.js";
import { NotesService } from "./services/inMemory/NotesService.js";
import { NotesValidator } from "./validator/notes/index.js";
import { ClientError } from "./exceptions/ClientError.js";

const init = async () => {

  const noteService = new NotesService()

  const server = new Hapi.Server({
    port: 3000,
    // eslint-disable-next-line no-undef
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
        cors: {
            origin: ["*"]
        }
    }
  });

  // server.route(routes)


  await server.register({
    plugin: notes,
    options: {
      service: noteService,
      validator: NotesValidator
    }
  })

  server.ext('onPreResponse', (request, h) => {
    const {response} = request;

    // penanganan client error
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'failed',
        message: response.message
      })
      newResponse.code(response.statusCode)
      return newResponse
    }
    return h.continue
  })



  await server.start();
  console.log(`Server Running on ${server.info.uri}`)

};

init()