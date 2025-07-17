import express, { Express } from "express";
import dotenv from 'dotenv';

import UserRoutes from './routes/userRoutes';
import AuthenticationRoutes from './routes/authenticationRoutes';
import ConnectDb  from './db/connect';

dotenv.config();
const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const userRoutes: UserRoutes = new UserRoutes();
const authRoutes: AuthenticationRoutes = new AuthenticationRoutes();
app.use(express.json());
app.use('/api/auth', authRoutes.initRoutes());
app.use('/api/users', userRoutes.initRoutes());

const db = new ConnectDb();

db.connect().then(():void => {
    app.listen(port, ():void => { 
        console.log(`Server is running on port ${port}`);
    });
}).catch((err):never => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});