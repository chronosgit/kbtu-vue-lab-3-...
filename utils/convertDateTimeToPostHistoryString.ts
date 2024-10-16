export default function (ts: string): string {
	const date = new Date(ts);
	const now = new Date();

	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const timeString = `${hours}:${minutes}`;

	if (diffInDays === 0) {
		if (diffInHours === 0) {
			return `Today, ${timeString}`;
		} else {
			return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago, ${timeString}`;
		}
	} else if (diffInDays === 1) {
		return `Yesterday, ${timeString}`;
	} else {
		return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago, ${timeString}`;
	}
}
