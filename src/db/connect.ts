import mongoose from "mongoose";

class ConnectDb {
	/*  public async connect(): Promise<string | void> {
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
    } */ 
	private static instance: ConnectDb;
	private isConnected = false;
	private constructor() {}
	public static getInstance(): ConnectDb {
		if (!ConnectDb.instance) {
			ConnectDb.instance = new ConnectDb();
		}
		return ConnectDb.instance;
	}

	public async connect(): Promise<string | void> {
		if (this.isConnected) {
			console.log("Database already connected");
			return;
		}
		try {
			const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
			console.log(`Connecting to database at ${uri}`);

			if (!uri) {
				throw new Error("MONGODB_URI environment variable is not defined");
			}

			const connect = await mongoose.connect(uri);
			this.isConnected = true;

			console.log("Database connected successfully:", connect.connection.host);
			return connect.connection.host;
		} catch (error) {
			console.error("Database connection error:", error);
		}
	}
}

export default ConnectDb;
