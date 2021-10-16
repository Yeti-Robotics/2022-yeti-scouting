import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	teamNumber: { type: Number, required: true },
	administrator: { type: Boolean, default: false, required: true },
});

export interface User {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	teamNumber: number;
	administrator: boolean;
}

export default models.user || model('user', userSchema);
