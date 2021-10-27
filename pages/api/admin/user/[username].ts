import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import User from '@/models/user';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const username = req.query.username;
		if (!username) {
			return res.status(400).json({ message: 'Awating hydration.' });
		}
		const user = await User.findOne({ username: username });
		return res.status(200).json(user);
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
