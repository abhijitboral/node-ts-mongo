import { Request, Response, NextFunction } from 'express';
import JWTUtility from '../utility/jwt';

class AuthenticationMiddleware {
    public static authenticate(req: Request, res: Response, next: NextFunction): Response | void {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = JWTUtility.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        next();
    }
}
export default AuthenticationMiddleware;