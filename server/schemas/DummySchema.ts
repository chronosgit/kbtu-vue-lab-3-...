import mongoose from 'mongoose';

const DummySchema = new mongoose.Schema({
	body: {
		type: String,
		required: true,
	},
});

export default DummySchema;
