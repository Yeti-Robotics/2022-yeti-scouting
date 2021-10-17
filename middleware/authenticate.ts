import jwt from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const authenticate =
	(handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const token = req.cookies['jwt'];
			if (token == null) return res.status(401).send('');

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(403);
				req.body = JSON.stringify(user);
			});
			return handler(req, res);
		} catch (err) {
			return res.status(401).send('Error');
		}
	};

export default authenticate;
