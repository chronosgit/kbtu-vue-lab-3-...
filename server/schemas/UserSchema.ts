import { Document, Schema, Types } from 'mongoose';

interface IUser extends Document {
	email: string;
	username: string;
	password: string;
	age: number;
	location: string;
	likes: number; // others liking the user
	rating: number;
	lastLoggedIn: Date;
	isEmailConfirmed: boolean;
	following: Types.ObjectId[];
}

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

		likes: {
			type: Number,
			default: 0,
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
			max: 120, // old ah
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
		following: [
			{
				type: [Schema.Types.ObjectId],
				default: [],
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

export default UserSchema;
