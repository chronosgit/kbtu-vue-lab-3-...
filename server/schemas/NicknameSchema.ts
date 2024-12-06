import { Types, Schema, Document } from 'mongoose';

export interface INickname extends Document {
	nicknameCreatorId: Types.ObjectId;
	nicknamedUserId: Types.ObjectId;
	nickname: string;
}

const NicknameSchema = new Schema<INickname>({
	nicknameCreatorId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	nicknamedUserId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	nickname: {
		type: String,
		required: true,
		trim: true,
	},
});

export default NicknameSchema;
