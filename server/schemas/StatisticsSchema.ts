import mongoose, { Schema } from 'mongoose';

const StatisticsSchema = new mongoose.Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	activities: [{ type: Date, required: true }],
});

export default StatisticsSchema;
