import mongoose from 'mongoose';
import FollowingSchema from '~/server/schemas/FollowingSchema';

const Following = mongoose.model('Following', FollowingSchema);

export default Following;
