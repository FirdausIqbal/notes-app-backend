
export class AuthenticationHandler {
    constructor(authenticationService, userService, tokenManager, validator) {
        this._authenticationService = authenticationService;
        this._userService = userService;
        this._tokenManager = tokenManager;
        this._validator = validator;
    }

    async postAuthenticationHandler(request, h) {
        this._validator.validatePostAuthentication(request.payload)

        const {username , password} = request.payload;
        const id = await this._userService.verifyUserCredential(username, password)

        const accessToken = await this._tokenManager.generateAccessToken({id})
        const refreshToken = this._tokenManager.generateRefreshToken({id})

        await this._authenticationService.addRefreshToken(refreshToken)

        const response = h.response({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data: {
                accessToken,
                refreshToken
            }
        }).code(201)
        return response
    }

    async putAuthenticationHandler(request, h) {
        this._validator.validatePutAuthentication(request.payload)

        const {refreshToken} = request.payload;
        await this._authenticationService.verifyRefreshToken(refreshToken)
        const {id} = this._tokenManager.verifyRefreshToken(refreshToken)

        const accessToken = await this._tokenManager.generateAccessToken({ id })

        const response = h.response({
            status: 'success',
            message: 'Access Token berhasil diperbarui',
            data: {
                accessToken
            }
        }).code(200)
        return response
    }

    async deleteAuthenticationHandler(request, h) {
        this._validator.validateDeleteAuthentication(request.payload)

        const {refreshToken} = request.payload;

        await this._authenticationService.verifyRefreshToken(refreshToken)
        await this._authenticationService.deleteRefreshToken(refreshToken)

        const response = h.response(
            {
                status: 'success',
                message: 'Refresh token berhasil dihapus'
            }
        ).code(200)
        return response;

    }


}