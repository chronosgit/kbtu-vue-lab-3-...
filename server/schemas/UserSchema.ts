import { Document, Schema, Types } from 'mongoose';

interface IFollowing {
	userId: Types.ObjectId;
	nickname?: string | null;
}

interface IUser extends Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	password: string;
	age: number;
	location: string;
	rating: number;
	lastLoggedIn: Date;
	isEmailConfirmed: boolean;
	followings: IFollowing[];
	likedPosts: Types.ObjectId[];
}

const FollowingSchema: Schema<IFollowing> = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		nickname: {
			type: String,
			trim: true,
			default: null,
		},
	},
	{ _id: false }
);

const UserSchema: Schema<IUser> = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			validate: {
				validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			maxlength: 30,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		isEmailConfirmed: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		age: {
			type: Number,
			min: 0,
			max: 150, // old ah
			default: 0,
		},
		location: {
			type: String,
			trim: true,
			default: '',
		},
		lastLoggedIn: {
			type: Date,
			default: new Date(),
		},
		followings: [FollowingSchema],
		likedPosts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{ timestamps: true }
);

export default UserSchema;
