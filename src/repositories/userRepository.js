import DB from '../db';
import objectUtils from '../utils/objectUtils';

export default {
    getUserById: (userId) => new Promise((resolve, reject) => {
        DB.query('SELECT * FROM users WHERE user_id = $1', [userId])
            .then(({ rows, rowCount }, err) => {
                if (err) console.error(err);
                if (rowCount) resolve(objectUtils.camelKeys(rows[0]));
                else resolve(null)
            })
            .catch(reject);
    }),
    getUserByUsername: (username) => (
        DB.query('SELECT * FROM users WHERE username = $1', [username])
    ),
};
