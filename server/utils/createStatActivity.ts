import mongoose, { isValidObjectId } from 'mongoose';
import Statistics from '../models/Statistics';

export default async function (userId: string) {
	if (!isValidObjectId(userId)) return;

	const userStats = await Statistics.findOne({ userId });

	console.log(userStats);

	// Add current timestamp
	if (userStats) {
		userStats.activities.push(new Date());
		await userStats.save();

		return;
	}

	const newStat = new Statistics({
		userId: new mongoose.Types.ObjectId(userId),
		activities: [new Date()],
	});
	await newStat.save();
}
