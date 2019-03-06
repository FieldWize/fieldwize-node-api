import { Pool } from 'pg';
import configService from './services/configService';

const _pool = new Pool({connectionString: configService.DB_URL});

_pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});

process.on('exit', (code) => {
    console.log("Process exiting; closing DB connection pool...")
    _pool.end();
})

// acts as a facade to db pool instance.
class DB {
    connect() {
        return _pool.connect();
    }
    query(q, args) {
        return _pool.query(q, args);
    }
    get stats() {
        return {
            totalCount: pool.totalCount,
            idleCount: pool.idleCount,
            waitingCount: pool.waitingCount,
        };
    }
}

export default new DB();
