import mongoose from 'mongoose';

let isConnected = false;

export default defineNuxtPlugin(async () => {
	if (!isConnected) {
		try {
			const { MONGO_URI } = useRuntimeConfig();

			await mongoose.connect(MONGO_URI);

			isConnected = true;
			console.log('Connected to MongoDB');
		} catch (err) {
			console.error('Error connecting to MongoDB', err);
		}
	}
});
