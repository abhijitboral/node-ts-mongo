import express, { Router } from 'express';
import AuthController from '../controller/authController';
import FileUploader from '../lib/fileUploader';

class AuthenticationRoutes { 
    private router: Router = express.Router();
    public initRoutes(): express.Router {
        const authController = new AuthController();
        this.router.post('/register', FileUploader.singleUploadFile('avatar', 'profile-images'), authController.register);
        this.router.post('/login', authController.login);
        return this.router;
    }
}

export default AuthenticationRoutes;