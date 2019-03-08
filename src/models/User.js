import { ObjectModel, FunctionModel } from 'objectmodel';
import Uuid from '../types/Uuid';

const User = new ObjectModel({
    userId: Uuid,
    clientId: Uuid,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isActive: Boolean,
    creationDate: Date,
    modificationTimestamp: Date,
});
User.prototype.getFullName = FunctionModel(User).return(String)(
    function(user) { return user.firstName + " " + user.lastName; }
);
User.prototype.getResponseObject = FunctionModel(User).return(Object)(
    function(user) {
        let json = {...user};
        delete json.password;
        delete json.clientId;
        return json;
    }
);

export default User;
