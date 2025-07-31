import express, { Express } from "express";
import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

import UserRoutes from "./routes/userRoutes";
import AuthenticationRoutes from "./routes/authenticationRoutes";
import ConnectDb from "./db/connect";
import config from "./config/config";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());

const port: number = (typeof config.port === "string" )? parseInt(config.port) : config.port;
const userRoutes: UserRoutes = new UserRoutes();
const authRoutes: AuthenticationRoutes = new AuthenticationRoutes();
console.log(`Environment: ${config.env}`);
if (config.env === 'production') { 
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100,
			message: "Too many requests, please try again later.",
		})
	);
}

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/auth", authRoutes.initRoutes());
app.use("/api/users", userRoutes.initRoutes());

if (cluster.isPrimary) {
	const numCPUs = os.cpus().length;
	console.log(`CPU: ${numCPUs} , Master ${process.pid} is running on - ${process.env.NODE_ENV} environment`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} exited.`);
		console.log(`Exit code: ${code}`);
		console.log(`Signal: ${signal}`);
		console.log('Starting a new worker...');
	});
} else {
	console.log(`Worker ${process.pid} started`);
	//const db = new ConnectDb();
	const db = ConnectDb.getInstance();
	db.connect()
		.then((): void => {
			app.listen(port, (): void => {
				console.log(`Server is running on port ${port}`);
			});
		})
		.catch((err): never => {
			console.error("Failed to connect to database:", err);
			process.exit(1);
		});
}