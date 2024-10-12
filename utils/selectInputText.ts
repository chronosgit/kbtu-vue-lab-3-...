export default function (e: Event) {
	const target = e.target as HTMLInputElement;

	target.select();
}
