import PostsService from '~/services/PostsService';
import type IPost from '~/interfaces/IPost';

export default function () {
	const posts = ref<IPost[]>([]);

	const { execute: fetchMyPosts } = useAsyncData(
		'fetchMyPosts',
		async () => {
			try {
				const res = await PostsService.getMyPosts();
				const { posts: fetchedPosts } = res.data as { posts: IPost[] };

				posts.value = fetchedPosts;

				return res;
			} catch (err) {
				console.error(err);
				return null;
			}
		},
		{ immediate: false }
	);

	const deletePost = async (postId: string) => {
		try {
			const res = await PostsService.deleteMyPost(postId);

			const deletedPostIndex = posts.value.findIndex((f) => f._id === postId);
			posts.value?.splice(deletedPostIndex, 1);

			return res;
		} catch (err) {
			console.error(err);

			return null;
		}
	};

	return { posts, fetchMyPosts, deletePost };
}
