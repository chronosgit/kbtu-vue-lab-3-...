export default function (email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
