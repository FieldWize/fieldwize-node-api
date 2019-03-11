import _ from 'lodash';
import dotenv from 'dotenv';

// load .env vars
dotenv.config();

// accepted configurations with default values
const _configDefaults = {
    FW_SECRET: "F!3ldW1z3",
    FW_JWT_EXPIRATION: 60 * 60 * 24, // expires in 24 hours
    FW_DB_URL: "postgres://username:password@localhost/dbname?sslmode=disable",
}

/**
 * Returns the environment variable value of the provided key. If not available,
 * defers to default, or returns null if key is invalid.
 * Method held outside of class scope to make it immutable.
 */
let _getConfigValue = (key) => {
    if (_.has(_configDefaults, key)) {
        if (_.has(process.env, key)) {
            return process.env[key];
        }
        return _configDefaults[key];
    }
    return null;
}

/**
 * ConfigService provides access to environment variables that configure this app.
 */
class ConfigService {
    constructor() {
        // @todo: perhaps list configurations on startup?
    }
    get SECRET() { return _getConfigValue('FW_SECRET'); }
    get DB_URL() { return _getConfigValue('FW_DB_URL'); }
    get JWT_EXPIRATION() { return _getConfigValue('FW_JWT_EXPIRATION'); }
}

export default new ConfigService();
