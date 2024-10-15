import mongoose from 'mongoose';

let isDbConnected: any;

const connectDb = async () => {
	if (isDbConnected) return;

	try {
		const { MONGO_URI } = useRuntimeConfig();

		await mongoose.connect(MONGO_URI);

		isDbConnected = true;
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Failed to connect to MongoDB:', err);
	}
};

export default defineNitroPlugin(async () => {
	await connectDb();
});
