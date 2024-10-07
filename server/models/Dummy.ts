import mongoose from 'mongoose';
import DummySchema from '../schemas/DummySchema';

const DummyModel = mongoose.model('Post', DummySchema);

export default DummyModel;
