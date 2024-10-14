export default function (timestamp: string) {
	const now = new Date();
	const past = new Date(timestamp);
	const diff = Math.abs(now.getTime() - past.getTime());

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	let message = '';

	if (years > 0) {
		message += `${years} year${years > 1 ? 's' : ''} ago`;
	} else if (months > 0) {
		message += `${months} month${months > 1 ? 's' : ''} ago`;
	} else if (days > 0) {
		message += `${days} day${days > 1 ? 's' : ''} ago`;
	} else if (hours > 0) {
		message += `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} else if (minutes > 0) {
		message += `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	} else {
		message += 'just now';
	}

	return message;
}
