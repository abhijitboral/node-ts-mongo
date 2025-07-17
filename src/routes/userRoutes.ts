import express, { Router } from 'express';
import UserController from '../controller/userController';
import AuthenticationMiddleware from '../middleware/authentication';

class UserRoutes {
    private router: Router = express.Router();
    public initRoutes():express.Router {
        const userController = new UserController();
        this.router.use(AuthenticationMiddleware.authenticate);
        this.router.get('/', userController.getUsers);
        this.router.post('/', userController.createUser);
        this.router.get('/:id', userController.getUserById);
        this.router.put('/:id', userController.updateUser);
        this.router.delete('/:id', userController.deleteUser);
        return this.router;
    }
}

export default UserRoutes;