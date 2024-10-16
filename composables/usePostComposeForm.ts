import PostsService from '~/services/PostsService';

export default function () {
	const postDescr = ref('');

	const { execute } = useAsyncData(
		'createPost',
		async () => {
			try {
				const res = await PostsService.createPost(postDescr.value);

				console.log(res);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);

	const onFormSubmit = () => {
		if (!postDescr.value) {
			console.error('Description must be valid');
			return;
		}

		execute();
	};

	return { postDescr, onFormSubmit };
}
