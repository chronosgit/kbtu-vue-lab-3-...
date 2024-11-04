import { Document, Schema, Types } from 'mongoose';

export interface IChatMessage {
	authorId: Types.ObjectId;
	content: string;
	timestamp: Date;
}

export interface IChat extends Document {
	userIds: string[];
	messages: IChatMessage[];
	createdAt: Date;
}

export type ChatDocument = IChat & Document;

// Define the Chat schema
const ChatSchema = new Schema({
	userIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	messages: [{ type: String, required: true }],
	createdAt: { type: Date, default: Date.now },
});

export default ChatSchema;
