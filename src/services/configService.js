import _ from 'lodash';

// accepted configurations with default values
const _configDefaults = {
    FW_SECRET: "F!3ldW1z3",
    FW_DB_URL: "postgres://localhost:password@localhost/localhost?sslmode=disable",
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
        console.log(process.env);
    }
    get SECRET() {
        return _getConfigValue('FW_SECRET');
    }
    get DB_URL() {
        return _getConfigValue('FW_DB_URL');
    }
}

export default new ConfigService();
