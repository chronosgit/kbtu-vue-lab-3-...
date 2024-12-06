import { isValidObjectId } from 'mongoose';
import Nickname from '~/server/models/Nickname';

export default async function (
	myId: string,
	targetUserId: string
): Promise<string | null> {
	if (!isValidObjectId(targetUserId) || !isValidObjectId(myId)) return null;

	const nicknameRel = await Nickname.findOne({
		nicknameCreatorId: myId,
		nicknamedUserId: targetUserId,
	}).lean();
	if (!nicknameRel) return null;

	return nicknameRel.nickname;
}
