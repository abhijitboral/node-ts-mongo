import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
export const isValidPassword = (password: string): boolean => {
    return password.length >= 5 && password.length <= 1024;
};