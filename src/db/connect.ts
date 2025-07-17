import mongoose from 'mongoose';

class ConnectDb {
    public async connect(): Promise<string | void> {
        try {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
            console.log(`Connecting to database at ${uri}`);
            if (!uri) {
                throw new Error('MONGODB_URI environment variable is not defined');
            }
            const connect = await mongoose.connect(uri);
            console.log('Database connected successfully', connect.connection.host);
            return connect.connection.host;
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }
}

export default ConnectDb;
