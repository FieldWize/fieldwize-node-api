import { authService } from '../services';
import jwtMiddleware from '../middleware/jwtMiddleware';

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
        // just call the middleware directly
        jwtMiddleware(request, response, () => {
            response.json(request.authUser);
        });
    },
}
