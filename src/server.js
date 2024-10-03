import Hapi from "@hapi/hapi";
import { routes } from "./routes/routes.js";
const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ["*"]
        }
    }
  });
  server.route(routes)

  await server.start();
  console.log(`Server Running on ${server.info.uri}`)

};

init()