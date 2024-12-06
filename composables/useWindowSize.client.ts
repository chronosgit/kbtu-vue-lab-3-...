export const useWindowSize = () => {
	const isMobile = ref(false);

	const checkWindowSize = () => {
		isMobile.value = window.innerWidth <= 640;
	};

	onMounted(() => {
		checkWindowSize();
		window.addEventListener('resize', checkWindowSize);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', checkWindowSize);
	});

	return {
		isMobile,
	};
};
