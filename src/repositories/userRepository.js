import DB from '../db';
import objectUtils from '../utils/objectUtils';
import { User } from '../models';

export default {
    getUserById: (userId) => new Promise((resolve, reject) => {
        DB.query('SELECT * FROM users WHERE user_id = $1', [userId])
            .then(({ rows, rowCount }, err) => {
                if (err) console.error(err);
                if (rowCount) resolve(new User(objectUtils.camelKeys(rows[0])));
                else resolve(null)
            })
            .catch(reject);
    }),
    getUserByUsername: (username) => new Promise((resolve, reject) => {
        DB.query('SELECT * FROM users WHERE username = $1', [username])
            .then(({ rows, rowCount }, err) => {
                if (err) console.error(err);
                if (rowCount) resolve(new User(objectUtils.camelKeys(rows[0])));
                else resolve(null)
            })
            .catch(reject);
    }),
    searchUsers: (limit, offset, searchParams) => new Promise((resolve, reject) => {
        // @todo: needs to implement search params or something
        let resultSet = { total: 0, results: [] };
        DB.query('SELECT * FROM users WHERE 1 = 1 LIMIT $1 OFFSET $2', [limit, offset])
            .then(({ rows, rowCount }, err) => {
                if (err) console.error(err);
                resultSet.results = rows.map(row => new User(objectUtils.camelKeys(row)));
                return DB.query('SELECT COUNT(*) AS total FROM users WHERE 1 = 1');
            })
            .then(({ rows }, err) => {
                if (err) console.error(err);
                resultSet.total = rows[0].total;
                resolve(resultSet)
            })
            .catch(reject);
    })
};
