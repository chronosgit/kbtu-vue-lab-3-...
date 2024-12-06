export default function (initState = false) {
	const state = ref(initState);

	const activateState = () => (state.value = true);

	const disactiveState = () => (state.value = false);

	const toggleState = () => (state.value = !state.value);

	return { state, activateState, disactiveState, toggleState };
}
