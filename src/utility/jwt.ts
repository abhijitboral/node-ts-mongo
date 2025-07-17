import { console } from 'inspector';
import jwt from 'jsonwebtoken';
import config from '../config/config';

class JWTUtility { 
    private static secretKey: string = config.jwt.secret;
    private static expiresIn: string = config.jwt.expiresIn;

    private static getSecretKey(): string {
        if (!JWTUtility.secretKey) {
            throw new Error('JWT secret key is not defined');
        }
        return JWTUtility.secretKey;
    }

    public static generateToken(payload: object): string {
        return jwt.sign(payload, JWTUtility.getSecretKey(), { expiresIn: JWTUtility.expiresIn } as jwt.SignOptions);
    }

    public static verifyToken(token: string): jwt.JwtPayload | null {
        try {
            return jwt.verify(token, JWTUtility.getSecretKey()) as jwt.JwtPayload;
        } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
}
export default JWTUtility;