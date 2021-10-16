import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';
import handleError from '@/middleware/handle-error';
import bcrypt from 'bcrypt';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const { username, firstName, lastName, password, teamNumber } = JSON.parse(req.body);
		const salt = await bcrypt.genSalt(10);
		const user = new User({
			username,
			firstName,
			lastName,
			teamNumber,
			password: await bcrypt.hash(password, salt),
		});
		await user.save((err: unknown) => {
			if (err) {
				console.error(err);
				return res.status(500).json({
					message: 'There was an error creating your account',
				});
			}
			return res.status(200).json({ message: 'User successfully registered' });
		});
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
