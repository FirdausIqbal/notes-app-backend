import Hapi from "@hapi/hapi";
import notes from "./api/notes/index.js";
import { NoteService } from "./services/postgres/NoteService.js";
import { NotesValidator } from "./validator/notes/index.js";
import { ClientError } from "./exceptions/ClientError.js";
import dotenv from "dotenv";
import users from "./api/users/index.js";
import { UserService } from "./services/postgres/UserService.js";
import { UsersValidator } from "./validator/users/index.js";

dotenv.config();

const init = async () => {
  const noteService = new NoteService();
  const userService = new UserService();

  const server = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // server.route(routes)

  await server.register([
    {
      plugin: notes,
      options: {
        service: noteService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: UsersValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    // penanganan client error
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "failed",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if(response instanceof Error) {
      console.error(response.message)
      console.error(response.stack)
    }
  
    return h.continue;
  });


  await server.start();
  console.log(`Server Running on ${server.info.uri}`);
};

init();
