import mongoose from 'mongoose';

let isConnected = false;

export const useMongo = () => {
	const connectToMongo = async () => {
		console.log(useRuntimeConfig());

		// if (!isConnected) {
		// 	try {
		// 		await mongoose.connect(process.env.MONGO_URI, {
		// 			useNewUrlParser: true,
		// 			useUnifiedTopology: true,
		// 		});
		// 		isConnected = true;
		// 		console.log('Connected to MongoDB');
		// 	} catch (err) {
		// 		console.error('Error connecting to MongoDB', err);
		// 	}
		// }
	};

	return { connectToMongo };
};
