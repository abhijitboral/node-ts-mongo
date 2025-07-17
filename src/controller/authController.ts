import { Request, Response } from 'express';
import User from '../model/user';
import { hashPassword, comparePasswords } from '../utility/passwordhash';
import { validateUser } from '../utility/uservalidation';
import JWTUtility from '../utility/jwt';
class AuthController {
    public async register(req: Request, res: Response): Promise<Response> {
        const { name, email, password, role } = req.body;
        try {
            const isValid = validateUser(req.body);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            
            const hashedPassword = await hashPassword(password);
            const user = new User({ name, email, password: hashedPassword, role });
            await user.save();
            return res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error registering user', error: errorMessage });
        }
    }
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await comparePasswords(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const token = JWTUtility.generateToken({ id: user._id, email: user.email, role: user.role });
            return res.status(200).json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error logging in', error: errorMessage });
        }
    }
}
export default AuthController;