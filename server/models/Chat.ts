import mongoose from 'mongoose';
import ChatSchema from '../schemas/ChatSchema';

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
