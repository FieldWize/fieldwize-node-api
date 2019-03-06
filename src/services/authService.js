import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configService from './configService';

/**
 * AuthService
 * Provides services for authentication and authorization of users.
 */
class AuthService {
    /**
     * authenticateUser
     * Attempts to authenticate the provided username and password. If successful,
     * will return an AuthUser object. Returns null on failure.
     */
    authenticateUser({username, password}) {
        if (username && password) {
            // userRepository.getUserByUsername(username)
        }
        return null;
    }

    /**
     * getPasswordHash
     * Returns a hash string based on the provided password text.
     */
    getPasswordHash(textPwd) {
        try {
            return bcrypt.hashSync(textPwd, 10);
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    /**
     * verifyPassword
     * Compares text password to hashed password. If they match, returns true,
     * otherwise returns false.
     */
    verifyPassword(textPwd, hashPwd) {
        try {
            if (bcrypt.compareSync(textPwd, hashPwd)) {
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    /**
     * createJWT
     * Creates a json web token (jwt) based on the userId, clientId, and
     * timestamp provided.
     */
    createJWT({userId, clientId, timestamp}) {
        if (!userId || !clientId || !timestamp) {
            console.err(new Error("Invalid claim payload for JWT"));
            return null;
        }
        return jwt.sign({userId, clientId, timestamp}, configService.SECRET, {
            expiresIn: configService.JWT_EXPIRATION,
        });
    }

    /**
     * verifyJWT
     * Attempts to verify the json web token (jwt). If successful, will create
     * and return an AuthUser object, or will return null otherwise.
     */
    verifyJWT(token) {
        try {
            let claims = jwt.verify(token, config.secret);
            // @todo: need to build AuthUser from claim
            return claims;
        } catch (err) {
            console.error(err);
        }
        return null;
    }
}

export default new AuthService();
