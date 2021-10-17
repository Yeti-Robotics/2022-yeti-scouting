import { model, models, Schema } from 'mongoose';

const tokenSchema = new Schema({
	username: { type: String, required: true, unique: true },
	refreshToken: { type: String, required: true, unique: true },
});

export interface Token {
	username: string;
	refreshToken: string;
}

export default models.token || model('token', tokenSchema);
