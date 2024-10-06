export default function (
	templateRef: Ref<HTMLElement | ComponentPublicInstance | null>
) {
	const isActive = ref(false);

	const activate = () => (isActive.value = true);

	const disactivate = () => (isActive.value = false);

	const onDocumentClick = (e: MouseEvent) => {
		const clickedTarget = e.target as Element;

		if (!clickedTarget || !templateRef?.value) return;

		let checkedEl: HTMLElement | null = null;

		if (templateRef.value instanceof HTMLElement) {
			checkedEl = templateRef.value;
		} else {
			checkedEl = templateRef.value.$el;
		}

		if (checkedEl && !checkedEl.contains(clickedTarget)) {
			isActive.value = false;
		}
	};

	onMounted(() => document.addEventListener('click', onDocumentClick));
	onUnmounted(() => document.removeEventListener('click', onDocumentClick));

	return { activate, disactivate, isActive };
}
