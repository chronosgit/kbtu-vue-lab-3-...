import PostsService from '~/services/PostsService';
import type IPost from '~/interfaces/IPost';
import type IPostsMeta from '~/interfaces/IPostsMeta';

export default function () {
	const posts = ref<IPost[]>([]);

	const curPage = ref<number>(1);
	const totalPages = ref<number | null>(null);
	const postsPerPage = 2;
	const hasNextPage = ref(false);
	const hasPrevPage = ref(false);

	const { execute: fetchMyPosts } = useAsyncData(
		'fetchMyPosts',
		async () => {
			try {
				const res = await PostsService.getMyPosts(curPage.value, postsPerPage);
				const { posts: fetchedPosts, meta } = res.data as {
					posts: IPost[];
					meta: IPostsMeta;
				};

				totalPages.value = meta.totalPages;
				hasNextPage.value = meta.hasNextPage;
				hasPrevPage.value = meta.hasPreviousPage;
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
			// posts.value?.splice(deletedPostIndex, 1);

			fetchMyPosts();

			return res;
		} catch (err) {
			console.error(err);

			return null;
		}
	};

	onMounted(() => fetchMyPosts());

	const toNextPage = () => {
		if (!hasNextPage.value) return;

		curPage.value++;
		fetchMyPosts();
	};

	const toPrevPage = () => {
		if (!hasPrevPage.value) return;

		curPage.value--;
		fetchMyPosts();
	};

	return {
		posts,
		curPage,
		totalPages,
		fetchMyPosts,
		deletePost,
		toNextPage,
		toPrevPage,
	};
}
