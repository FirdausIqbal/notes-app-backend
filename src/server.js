import Hapi from "@hapi/hapi";
import Jwt from "@hapi/jwt"
import { ClientError } from "./exceptions/ClientError.js";
import dotenv from "dotenv";

// notes
import notes from "./api/notes/index.js";
import { NoteService } from "./services/postgres/NoteService.js";
import { NotesValidator } from "./validator/notes/index.js";

// users
import users from "./api/users/index.js";
import { UserService } from "./services/postgres/UserService.js";
import { UsersValidator } from "./validator/users/index.js";

// authentications
import { AuthenticationService } from './services/postgres/AuthenticationService.js'
import authentications from "./api/authentications/index.js";
import { AuthenticationValidator } from "./validator/authentications/index.js";
import { TokenManager } from "./tokenize/TokenManager.js";

dotenv.config();

const init = async () => {
  const noteService = new NoteService();
  const userService = new UserService();
  const authenticationService = new AuthenticationService();

  const server = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt
    }
  ])

  server.auth.strategy('notesapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      // Notes Plugin
      plugin: notes,
      options: {
        service: noteService,
        validator: NotesValidator,
      },
    },
    {
      // Users Plugin
      plugin: users,
      options: {
        service: userService,
        validator: UsersValidator,
      },
    },
    {
      // Athentications Plguin
      plugin: authentications,
      options: {
        authenticationService,
        userService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator
      }
    }
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
