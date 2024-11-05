import mongoose from 'mongoose';
import StatisticsSchema from '../schemas/StatisticsSchema';

const Statistics = mongoose.model('Statistics', StatisticsSchema);

export default Statistics;
