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
                response.json(user);
            })
            .catch(err => {
                console.log(err);
                response.status(404).json({error: 'User could not be found'})
            });
    },
    /**
     * [GET] /users
     * Returns paginated list of users
     */
    searchUsers: (request, response) => {
        response.json({
            message: "[GET] /users",
        })
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
