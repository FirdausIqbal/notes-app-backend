import { routes } from "./routes.js";
import { UserHandler } from "./handler.js"

export default {
    name: 'users',
    version: '1.0.0',
    register: async (server, {service , validator}) => {
        const userHandler = new UserHandler(service, validator);
        server.route(routes(userHandler))
    }
}