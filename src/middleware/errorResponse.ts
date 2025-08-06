
import { Request, Response, NextFunction } from 'express';
import ErrorHandlling from '../helper/errorHandlling';
class ErrorResponse {
    public static errorHandle(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error('Error occurred:', err);

        const statusCode = (err as any).statusCode || 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).json({ error: message });
    }
}
export default ErrorResponse;

