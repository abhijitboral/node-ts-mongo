import express, { Router } from 'express';
import AuthController from '../controller/authController';

class AuthenticationRoutes { 
    private router: Router = express.Router();
    public initRoutes():express.Router {
        const authController = new AuthController();
        this.router.post('/register', authController.register);
        this.router.post('/login', authController.login);
        return this.router;
    }
}

export default AuthenticationRoutes;