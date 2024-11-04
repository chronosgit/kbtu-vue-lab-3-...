import PostsService from '~/services/PostsService';

export default function () {
	const topic = ref('');
	const postDescr = ref('');

	const { execute } = useAsyncData(
		'createPost',
		async () => {
			try {
				const res = await PostsService.createPost(postDescr.value, topic.value);

				// Lame, instead of feedback ref
				alert('Cool!');

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

		const postTopics = getPostTopics();

		if (!postTopics.includes(topic.value)) {
			console.error('Invalid topic');
			return;
		}

		execute();
	};

	return { postDescr, topic, onFormSubmit };
}
