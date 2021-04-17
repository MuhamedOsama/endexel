// Environment variables imported from .env file

module.exports = {
	google: {
		id: process.env.GOOGLE_CLIENT_ID,
		secret: process.env.GOOGLE_CLIENT_SECRET
	},
	facebook: {
		id: process.env.FACEBOOK_CLIENT_ID,
		secret: process.env.FACEBOOK_CLIENT_SECRET
	},
    linkedin: {
        
    },
	jwtSecretKey: process.env.JWT_SECRET_KEY,
	jwtTokenLife: process.env.JWT_TOKEN_LIFE,
	refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET,
	refreshTokenLife: process.env.REFRESH_TOKEN_LIFE
};