import { ObjectModel } from 'objectmodel';
import Uuid from '../types/Uuid';

let columns = {
    userId: Uuid,
    clientId: Uuid,
    lastName: String,
    firstName: String,
}

class AuthUser extends ObjectModel(columns) {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export default AuthUser;
