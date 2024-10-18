import { Document, Schema, Types } from 'mongoose';

interface IPost extends Document {
	authorId: Types.ObjectId;
	authorUsername: string;
	rating: number;
	topic: string;
	description: string;
	createdAt: Date;
}

const PostSchema: Schema<IPost> = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	authorUsername: {
		type: String,
		required: true,
	},
	topic: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		default: '',
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default PostSchema;
