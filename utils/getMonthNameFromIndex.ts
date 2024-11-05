export default function (monthIndex: number) {
	if (monthIndex < 1 || monthIndex > 12) return;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return months[monthIndex - 1];
}
