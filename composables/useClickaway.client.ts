export default function (anchorRefKey: string) {
	const templateRef = useTemplateRef<
		HTMLElement | ComponentPublicInstance | null
	>(anchorRefKey);

	const isActive = ref(false);

	const activate = () => (isActive.value = true);
	const disactivate = () => (isActive.value = false);
	const toggle = () => (isActive.value = !isActive.value);

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

	onMounted(() => document.addEventListener('mousedown', onDocumentClick));
	onUnmounted(() => document.removeEventListener('mousedown', onDocumentClick));

	return { isActive, activate, disactivate, toggle };
}
