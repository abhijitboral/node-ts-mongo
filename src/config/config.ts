interface Config {
    env: string;
    port: number;
    mongoUri: string;
    jwt: {
        secret: string;
        expiresIn: string;
    }
}

export const config: Config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    mongoUri: process.env.MONGODB_URI || '',
    jwt: {
      	secret: process.env.JWT_SECRET || 'abhijit_dev',
      	expiresIn: process.env.JWT_EXPIRES_IN || '6h',
    },
};
export default config;