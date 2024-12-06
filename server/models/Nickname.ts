import mongoose from 'mongoose';
import NicknameSchema from '~/server/schemas/NicknameSchema';

const Nickname = mongoose.model('Nickname', NicknameSchema);

export default Nickname;
