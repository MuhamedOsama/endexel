//example
//to be added




// Environment variables imported from .env file
module.exports = {
	SMTP: {
        service: process.env.SMTP_SERVICE,
		auth: {
			pass: process.env.SMTP_PASSWORD || '',
			user: process.env.SMTP_USERNAME || ''
		},
		host: process.env.SMTP_HOST || '',
		port: process.env.SMTP_PORT || '',
		tls: {
			rejectUnauthorized: false
		}
	},
	SERVER: {
		host: process.env.HOST || '',
		port: process.env.PORT || ''
	},
	SECRET_KEYS: {
		seeker: {
			verification: process.env.JWT_SECRET_KEY_EMAIL_VERIFICATION_SEEKER || '',
			passwordReset: process.env.JWT_SECRET_KEY_PASSWORD_RESET_SEEKER || ''
		},
		provider: {
			verification: process.env.JWT_SECRET_KEY_EMAIL_VERIFICATION_PROVIDER || '',
			passwordReset: process.env.JWT_SECRET_KEY_PASSWORD_RESET_PROVIDER || ''
		}
	}
};