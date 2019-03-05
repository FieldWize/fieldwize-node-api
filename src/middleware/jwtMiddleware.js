/**
 * jwtMiddleware
 * Middleware that interprets jwt bearer token, if present, into an
 * AuthorizedUser object.
 */
const jwtMiddleware = (request, response, next) => {
    // @todo: interpret jwt token
    console.log("@todo: handle jwt token");
    request.authUser = {
        userId: 123,
        firstName: "Bob",
        lastName: "Saget",
        client: {
            clientId: 456,
            name: "Bob's Terrible Joke Foundation, LLC",
            domain: "bob",
            baseUrl: "bob.fieldwize.com",
        },
    };
    next()
}

export default jwtMiddleware;
