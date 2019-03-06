export default {
    /**
     * loginHandler
     * API endpoint provides username/password-based authentication
     * @method: POST
     * @url: /auth
     */
    loginHandler: (request, response) => {
        response.json({
            secret: configService.SECRET,
            dbUrl: configService.DB_URL,
            body: request.body,
            message: "[POST] /auth",
        });
    },

    /**
     * tokenLoginHandler
     * API endpoint provides token-based authentication
     * @method: POST
     * @url: /auth
     */
    tokenLoginHandler: (request, response) => {
        response.json({
            message: "[GET] /auth",
        });
    },
}
