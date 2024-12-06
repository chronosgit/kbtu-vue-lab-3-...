import mongoose, { Types, Schema, Document } from 'mongoose';

// Interface for the Following document
export interface IFollowing extends Document {
	followingUserId: Types.ObjectId;
	followedUserId: Types.ObjectId;
	timestamp: Date;
}

const FollowingSchema = new Schema<IFollowing>({
	followingUserId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	followedUserId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export default FollowingSchema;
