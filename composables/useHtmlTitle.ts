export default function useHtmlTitle() {
	const route = useRoute();

	const title = ref<string>('Sophisticated blog');

	watch(
		() => route.meta.title,
		(newTitle) => {
			console.log(newTitle);

			if (!newTitle) return;

			title.value = newTitle as string;
		}
	);

	return { title };
}
