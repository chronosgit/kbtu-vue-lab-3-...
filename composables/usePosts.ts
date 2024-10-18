import PostsService from '~/services/PostsService';
import type IPost from '~/interfaces/IPost';
import type IPostsMeta from '~/interfaces/IPostsMeta';

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
				const { posts: fetchedPosts, meta } = res.data as {
					posts: IPost[];
					meta: IPostsMeta;
				};

				totalPages.value = meta.totalPages;
				hasNextPage.value = meta.hasNextPage;
				hasPrevPage.value = meta.hasPreviousPage;

				posts.value = fetchedPosts;

				if (meta.totalPages === 0) curPage.value = 0;

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

	const likeButton = (postId: string) => {
		console.log(postId);
	};

	onMounted(() => fetchPosts());

	watch(filters, () => fetchPosts());

	return {
		filters,
		posts,
		curPage,
		totalPages,
		hasNextPage,
		hasPrevPage,
		toNextPage,
		toPrevPage,
		likeButton,
	};
}
