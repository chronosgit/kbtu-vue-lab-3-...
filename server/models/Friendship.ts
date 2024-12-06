import mongoose from 'mongoose';
import FriendshipSchema, {
	IFriendship,
} from '~/server/schemas/FriendshipSchema';

const Friendship = mongoose.model('Friendship', FriendshipSchema);

export default Friendship;
