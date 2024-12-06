import { Types, Schema, Document } from 'mongoose';

export interface IFriendship extends Document {
	friends: Types.ObjectId[];
	timestamp: Date;
}

const FriendshipSchema = new Schema<IFriendship>({
	friends: {
		type: [Types.ObjectId],
		required: true,
		default: [],
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export default FriendshipSchema;
