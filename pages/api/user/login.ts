import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';
import Token from '@/models/token';
import handleError from '@/middleware/handle-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const { password, username } = JSON.parse(req.body);
		const user = await User.findOne({ username });
		const plainUser = {
			username: user.username,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			administrator: user.administrator,
			teamNumber: user.teamNumber,
		};
		if (await bcrypt.compare(password, user.password)) {
			const accessToken = jwt.sign(plainUser, String(process.env.ACCESS_TOKEN_SECRET), {
				expiresIn: '1h',
			});
			const refreshToken = jwt.sign(plainUser, String(process.env.REFRESH_TOKEN_SECRET));
			if ((await Token.findOne({ username: username }).exec()) === null) {
				const token = new Token({ username, refreshToken });
				await token.save();
			}
			res.setHeader(
				'Set-Cookie',
				`jwt=${accessToken}; HttpOnly; Secure; Path=/; Expires=${new Date(
					Date.now().valueOf() + 3600000,
				).toUTCString()}`,
			);
			return res.status(200).json({ message: 'Logged in' });
		} else {
			return res.status(400).json({ message: 'Incorrect username or password' });
		}
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
