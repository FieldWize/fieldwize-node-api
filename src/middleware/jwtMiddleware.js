import { authService } from '../services';
import { userRepository } from '../repositories';
import { AuthUser } from '../models';

/**
 * jwtMiddleware
 * Middleware that interprets jwt bearer token, if present, into an
 * AuthorizedUser object.
 */
const jwtMiddleware = (request, response, next) => {
    // @note: we should really be getting this data from redis or some other
    // session service, but we'll use postgres for now to get the point across
    let bearerToken = request.headers.authorization || "";
    let token = bearerToken.replace(/^bearer\s+/i, "");
    let claims;
    try {
        claims = authService.verifyJWT(token);
    } catch (err) {
        console.log({token});
        console.error(err);
    }

    if (claims) {
        userRepository.getUserById(claims.userId)
            .then(user => {
                if (user) {
                    request.authUser = new AuthUser({token, ...user});
                } else {
                    throw new Error("User could not be found.");
                }
            })
            .finally(next);
    } else {
        response.status(403).end();
    }
}

export default jwtMiddleware;
