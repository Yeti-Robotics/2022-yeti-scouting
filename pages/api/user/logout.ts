import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Token from '@/models/token';
import handleError from '@/middleware/handle-error';
import jwt from 'jsonwebtoken';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = req.cookies['jwt'];
		if (token == null) return res.status(401).json({ isLoggedIn: false });
		jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), async (err, user) => {
			if (err) return res.status(403).json({ isLoggedIn: false });
			if ((await Token.findOne({ username: user?.username }).exec()) === null) {
				return res.status(403).json({ isLoggedIn: false });
			} else {
				Token.findOneAndDelete({ username: user?.username }, (err: unknown) => {
					if (err) return res.status(403).json({ isLoggedIn: false });
					res.setHeader(
						'Set-Cookie',
						'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
					);
					return res.status(200).json({ message: 'logged out', isLoggedIn: false });
				});
			}
		});
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
