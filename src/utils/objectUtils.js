import _ from 'lodash';

export default {
    /**
     * camelKeys
     * Converts all the keys in an object so that they are camel cased. Expects
     * keys to either be "snake_cased" or "kebab-cased".
     */
    camelKeys: (object) => {
        let result = {},
            toCamelCase = str => {
                return str.replace(/([-_][a-z])/ig, ($1) => {
                    return $1.toUpperCase().replace(/[-_]/, '');
                });
            };
        _.each(object, (val, key) => {
            result[toCamelCase(key)] = val;
        });
        return result;
    },
};
