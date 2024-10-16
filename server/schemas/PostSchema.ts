import { Document, Schema, Types } from 'mongoose';

interface IPost extends Document {
	authorId: Types.ObjectId;
	rating: number;
	description: string;
	createdAt: Date;
}

const PostSchema: Schema<IPost> = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
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
