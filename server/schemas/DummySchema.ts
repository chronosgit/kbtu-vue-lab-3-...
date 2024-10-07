import mongoose from 'mongoose';

const DummySchema = new mongoose.Schema({
	body: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default DummySchema;
