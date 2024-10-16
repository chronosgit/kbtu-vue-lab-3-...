import mongoose from 'mongoose';
import PostSchema from '../schemas/PostSchema';

const Post = mongoose.model('Post', PostSchema);

export default Post;
