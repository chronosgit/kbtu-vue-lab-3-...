export default function formatDate(ts: Date, separator = '.') {
	const padNumber = (num: number) => String(num).padStart(2, '0');

	const days = padNumber(ts.getDate());
	const months = padNumber(ts.getMonth() + 1);
	const years = ts.getFullYear();

	return `${days}${separator}${months}${separator}${years}`;
}
