import Hapi from "@hapi/hapi";
import { routes } from "./routes/routes.js";
const init = async () => {
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
  server.route(routes)

  await server.start();
  console.log(`Server Running on ${server.info.uri}`)

};

init()