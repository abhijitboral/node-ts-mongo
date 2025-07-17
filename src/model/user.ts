import mongoose, { Document, Schema } from 'mongoose';
enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}
export interface UserSchema extends Document {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

const userSchema = new Schema<UserSchema>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Guest }
});

export default mongoose.model<UserSchema>('User', userSchema);