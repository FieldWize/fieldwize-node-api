import { userRepository } from '../repositories';
import objectUtils from '../utils/objectUtils';

export default {
    /**
     * [GET] /users/:userId
     * Returns a single user
     */
    getUser: (request, response) => {
        userRepository.getUserById(request.params.userId)
            .then((user) => {
                if (user) response.json(user);
                else response.status(404).json({error: 'User could not be found'});
            })
            .catch(err => {
                console.error(err);
                response.status(500).end();
            });
    },
    /**
     * [GET] /users
     * Returns paginated list of users
     */
    searchUsers: (request, response) => {
        let limit = request.query.limit || 10,
            offset = request.query.offset || 0,
            q = request.query.q || "{}";

        userRepository.searchUsers(limit, offset, JSON.parse(q))
            .then(resultSet => {
                response.json({
                    total: resultSet.total,
                    results: resultSet.results.map(u => ({...u}))
                });
            })
            .catch(err => {
                console.error(err);
                response.status(500).end();
            });
    },
    /**
     * [POST] /users
     * Creates a new user
     */
    createUser: (request, response) => {
        response.json({
            message: "[POST] /users",
        })
    },
    /**
     * [PUT] /users/:userId
     * Updates an existing user
     */
    updateUser: (request, response) => {
        response.json({
            message: "[PUT] /users/"+request.params.userId,
        })
    },
}
