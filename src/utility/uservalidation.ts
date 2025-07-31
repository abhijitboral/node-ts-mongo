import joi from 'joi';

const userValidationSchema:joi.ObjectSchema = joi.object({
    name:       joi.string().min(2).max(100).required(),
    email:      joi.string().email().required(),
    password:   joi.string().min(5).max(1024).required(),
    role:       joi.string().valid('ADMIN', 'USER', 'GUEST').optional()
});
export const validateUser = (user: any): boolean => {
    const { error } = userValidationSchema.validate(user);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return true;
};