import bcrypt from 'bcrypt';

/**
 * AuthService
 * Provides services for authentication and authorization of users
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
        // @todo, return token
    }

    /**
     * parseJWT
     * Attempts to parse the json web token (jwt). If successful, will create
     * and return an AuthUser object, or will return null otherwise.
     */
    parseJWT(token) {
        // @todo, parse token and return AuthUser object
    }
}

export default authService;
