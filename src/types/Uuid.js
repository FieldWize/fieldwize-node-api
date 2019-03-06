import { BasicModel } from 'objectmodel';

/**
 * Uuid model enforces uuid pattern on string data
 */
const Uuid = BasicModel(new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i'));

export default Uuid;
