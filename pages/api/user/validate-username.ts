import connectDB from '@/middleware/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';
import handleError from '@/middleware/handle-error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const { username } = JSON.parse(req.body);
		const exists = (await User.findOne({ username: username }).exec()) !== null;
		if (!exists) {
			return res.status(200).json({ message: '/api/user/register', error: false });
		}
		return res
			.status(200)
			.json({ meessage: 'This username is already in use', exists: true, error: false });
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
