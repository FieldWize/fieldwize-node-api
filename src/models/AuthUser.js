import { ObjectModel, FunctionModel } from 'objectmodel';
import Uuid from '../types/Uuid';

const AuthUser = new ObjectModel({
    userId: Uuid,
    clientId: Uuid,
    token: [String],
    lastName: String,
    firstName: String,
});
AuthUser.prototype.getFullName = FunctionModel(AuthUser).return(String)(
    function(authUser) { return authUser.firstName + " " + authUser.lastName; }
);

export default AuthUser;
