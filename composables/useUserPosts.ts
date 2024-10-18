import PostsService from '~/services/PostsService';
import type IPost from '~/interfaces/IPost';
import type IPostsMeta from '~/interfaces/IPostsMeta';

export default function (userId: string) {
	const posts = ref<IPost[]>([]);

	const pageSize = 2;
	const curPage = ref(1);
	const totalPages = ref<number | null>(null);
	const hasPrevPage = ref(false);
	const hasNextPage = ref(false);

	const { execute } = useAsyncData(
		'getUserPosts',
		async () => {
			try {
				const res = await PostsService.getUserPosts(
					userId,
					curPage.value,
					pageSize
				);
				const { posts: fetchedPosts, meta } = res.data as {
					posts: IPost[];
					meta: IPostsMeta;
				};

				posts.value = fetchedPosts;
				totalPages.value = meta.totalPages;
				hasPrevPage.value = meta.hasPreviousPage;
				hasNextPage.value = meta.hasNextPage;

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
		execute();
	};

	const toNextPage = () => {
		if (!hasNextPage.value) return;

		curPage.value++;
		execute();
	};

	onMounted(() => execute());

	return {
		posts,
		curPage,
		totalPages,
		toPrevPage,
		toNextPage,
	};
}
