import mongoose from 'mongoose';
import DummySchema from '../schemas/DummySchema';

const Dummy = mongoose.model('Dummy', DummySchema);

export default Dummy;
