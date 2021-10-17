import jwt from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const authenticate =
	(handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const token = req.cookies['jwt'];
			if (token == null) return res.status(401).json({ isLoggedIn: false });

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(403).json({ isLoggedIn: false });
				req.method = 'POST';
				req.body = JSON.stringify({
					username: user?.username,
					firstName: user?.firstName,
					lastName: user?.lastName,
					teamNumber: user?.teamNumber,
					administrator: user?.administrator,
					password: user?.password,
				});
			});
			return handler(req, res);
		} catch (err) {
			return res.status(401).json({ isLoggedIn: false });
		}
	};

export default authenticate;
