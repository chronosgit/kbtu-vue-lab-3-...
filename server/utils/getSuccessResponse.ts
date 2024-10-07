export default function (code: number, message?: string, data?: object) {
	return {
		success: true,
		statusCode: code,
		statusMessage: message,
		data: data || {},
	};
}
