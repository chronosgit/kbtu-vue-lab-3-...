// import jwt from 'jsonwebtoken';

// export default defineEventHandler(async (e) => {
// 	try {
// 		const cookies = e.req.cookies;
// 		const refreshToken = cookies.refreshToken;

// 		if (!refreshToken) {
// 			throw createError({
// 				statusCode: 403,
// 				statusMessage: 'Refresh Token not found',
// 			});
// 		}

// 		// Verify the refresh token
// 		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

// 		// Generate new access token
// 		const newAccessToken = jwt.sign(
// 			{ id: decoded.id, email: decoded.email },
// 			SECRET_KEY,
// 			{
// 				expiresIn: '15m', // Access token expires in 15 minutes
// 			}
// 		);

// 		// Optionally, you can regenerate the refresh token
// 		const newRefreshToken = jwt.sign({ id: decoded.id }, REFRESH_SECRET_KEY, {
// 			expiresIn: '7d', // Refresh token expires in 7 days
// 		});

// 		// Set the new tokens as secure, HttpOnly cookies
// 		e.res.setHeader('Set-Cookie', [
// 			`accessToken=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900`, // 15 minutes
// 			`refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`, // 7 days
// 		]);

// 		return getSuccessResponse(200, 'Tokens refreshed successfully');
// 	} catch (err) {
// 		console.error(err);
// 		throw createError(getErrorOptions(err));
// 	}
// });
