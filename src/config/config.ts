export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || '',
    jwt: {
      	secret: process.env.JWT_SECRET || 'abhijit_dev',
      	expiresIn: process.env.JWT_EXPIRES_IN || '6h',
    },
};
export default config;