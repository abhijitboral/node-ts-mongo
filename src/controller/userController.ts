import { Request, Response } from 'express';
import User  from '../model/user';
import { hashPassword } from '../utility/passwordhash';
import { validateUser } from '../utility/uservalidation';
import FileUploader from '../lib/fileUploader';

class UserController {
    public async getUsers(req: Request, res: Response): Promise< Response> {
        try {
            const users = await User.find();
            if(users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            return res.status(200).json(users);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error fetching users', error: errorMessage });
            
        }
    }

    public async createUser(req: Request, res: Response) {
        console.log('Creating user with data:', req);
        let { name, email, password, role } = req.body;
        try {
            const isValid = validateUser(req.body) as boolean;
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'Image file is required' });
            }
            const imagePath = `/uploads/profile-images/${req.file.filename}`;
            const hashedPassword = await hashPassword(password);
            const user = new User({ name, email, password: hashedPassword, role, avatar: imagePath });
            await user.save();
            res.status(201).json({ message: 'User created successfully', user });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error creating user', error: errorMessage }); 
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const user = await User.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(user);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error fetching user', error: errorMessage });
            
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const user = await User.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Update user logic here
                const { name, email, password, role } = req.body;
                const isValid = validateUser(req.body) as boolean;
                if (!isValid) {
                    return res.status(400).json({ message: 'Invalid user data' });
                }
                if (password) {
                    user.password = await hashPassword(password);
                }
                user.name = name;
                user.email = email;
                user.role = role;
                await user.save();
                return res.status(200).json({ message: 'User updated successfully' });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ message: 'Error updating user', error: errorMessage });
        }
    }

    public deleteUser(req: Request, res: Response) {
        res.send(`User with ID: ${req.params.id} deleted`);
    }
}

export default UserController;
