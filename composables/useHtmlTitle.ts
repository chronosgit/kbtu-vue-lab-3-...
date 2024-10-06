export default function useHtmlTitle() {
	const route = useRoute();

	const title = ref('Sophisticated blog');

	watch(
		() => route.meta.title,
		(newTitle) => {
			if (!newTitle) return;

			title.value = newTitle as string;
		}
	);

	return { title };
}
