import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { configService } from '../services';
import AuthUser from '../models/AuthUser';

const HASH_ITERATIONS = 10;

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
        return new Promise((resolve, reject) => {
            let authUser;
            userRepository.getUserByUsername(username)
                .then(user => {
                    if (!user) throw new Error("User could not be found");
                    authUser = new AuthUser(user);
                    return bcrypt.compare(password, user.password);
                })
                .then(success => {
                    if (success) {
                        authUser.token = this.createJWT({...authUser, timestamp: new Date()})
                        resolve(authUser);
                    } else {
                        reject(new Error("Password is invalid"))
                    }
                })
                .catch(reject);
        });
    }

    /**
     * getPasswordHash
     * Returns a hash string based on the provided password text.
     */
    getPasswordHash(textPwd) {
        try {
            return bcrypt.hashSync(textPwd, HASH_ITERATIONS);
        } catch (err) {
            console.error(err);
        }
        return null;
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
        return jwt.verify(token, configService.SECRET);
    }
}

export default new AuthService();
