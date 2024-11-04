export default interface IServerApiResponse<T> {
	success: boolean;
	statusCode: number;
	statusMessage: string;
	data: T;
}
