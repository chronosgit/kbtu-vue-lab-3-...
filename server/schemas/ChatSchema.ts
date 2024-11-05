import { Document, Schema, Types } from 'mongoose';

export interface IChatMessage {
	authorId: Types.ObjectId;
	content: string;
	timestamp: Date;
}

export const MessageSchema = new Schema<IChatMessage>({
	authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	content: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});

export interface IChat extends Document {
	userIds: string[];
	messages: IChatMessage[];
	type: 'duo' | 'group';
	createdAt: Date;
}

export type ChatDocument = IChat & Document;

// Define the Chat schema
const ChatSchema = new Schema({
	userIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	messages: [{ type: MessageSchema, required: true }],
	type: { type: String, enum: ['duo', 'group'], required: true },
	createdAt: { type: Date, default: Date.now },
});

export default ChatSchema;
