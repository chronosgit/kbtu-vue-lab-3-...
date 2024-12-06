import PostsService from '~/services/PostsService';
import type IPost from '~/interfaces/features/posts/IPost';

export default function (topic: string) {
	const filters = ref<string>('');

	const curPage = ref(1);
	const pageSize = 4;
	const totalPages = ref<number | null>(null);
	const hasNextPage = ref(false);
	const hasPrevPage = ref(false);

	const posts = ref<IPost[]>([]);

	const { execute: fetchPosts } = useAsyncData(
		'getPosts',
		async () => {
			try {
				const res = await PostsService.getPosts(
					curPage.value,
					pageSize,
					filters.value,
					topic
				);
				if (res == null) return null;

				const { posts: fetchedPosts, meta } = res.data;

				if (meta.totalPages === 0) curPage.value = 0;
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

	const toPrevPage = () => {
		if (!hasPrevPage.value) return;

		curPage.value--;
		fetchPosts();
	};

	const toNextPage = () => {
		if (!hasNextPage.value) return;

		curPage.value++;
		fetchPosts();
	};

	const likePost = async (postId: string) => {
		try {
			await $fetch('/api/posts/like', {
				method: 'PUT',
				body: { postId },
			});

			fetchPosts();
		} catch (err) {
			console.error(err);
		}
	};

	onMounted(() => fetchPosts());

	watch(filters, () => {
		curPage.value = 1;
		fetchPosts();
	});

	return {
		filters,
		posts,
		curPage,
		totalPages,
		hasNextPage,
		hasPrevPage,
		toNextPage,
		toPrevPage,
		likePost,
	};
}
