import { authService } from '../services';

export default {
    /**
     * loginHandler
     * API endpoint provides username/password-based authentication
     * @method: POST
     * @url: /auth
     */
    loginHandler: (request, response) => {
        authService.authenticateUser(request.body)
            .then(authUser => {
                if (authUser) response.json(authUser);
                else throw new Error("Login attempt failed");
            })
            .catch((err) => {
                response.status(404).json({'error': err.message});
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
