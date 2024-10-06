export default function (str: string) {
	if (typeof str !== 'string' || str.length === 0) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Capitalizeable parameter must be non-empty string',
		});
	}

	return str[0].toUpperCase() + str.slice(1);
}
