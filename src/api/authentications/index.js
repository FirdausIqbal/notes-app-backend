import { AuthenticationHandler } from "./handler.js"
import { routes } from './routes.js'

export default {
    name: 'authentications',
    version: '1.0.0',
    register: async (server, {
        authenticationService,
        userService,
        tokenManager,
        validator
    }) => {
        const authenticationHandler = new AuthenticationHandler(authenticationService, userService, tokenManager, validator)
        server.route(routes(authenticationHandler))
    }
}