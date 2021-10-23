import jwt from 'jsonwebtoken';
import Token from '@/models/token';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const administrator =
	(handler: NextApiHandler, sendUser = true) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			res.setHeader('Chache-Control', 'no-store');
			const token = req.cookies['jwt'];
			if (!token) return res.status(401).json({ isLoggedIn: false });

			jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), async (err, user) => {
				if (err) return res.status(403).json({ isLoggedIn: false });
				if ((await Token.findOne({ username: user?.username }).exec()) === null)
					return res.status(403).json({ isLoggedIn: false });
				req.method = 'POST';
				const plainUser = {
					username: user?.username,
					firstName: user?.firstName,
					lastName: user?.lastName,
					teamNumber: user?.teamNumber,
					administrator: user?.administrator,
				};
				if (!plainUser.administrator)
					return res.status(403).json({
						message: 'You are not authoized to perform this action.',
					});
				if (sendUser) {
					req.body = JSON.stringify(plainUser);
				}
				return handler(req, res);
			});
		} catch (err) {
			return res.status(401).json({ isLoggedIn: false });
		}
	};

export default administrator;
