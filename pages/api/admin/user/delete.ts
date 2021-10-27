import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import User from '@/models/user';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const username = JSON.parse(req.body);
		await User.findOneAndDelete({ username: username });
		return res.status(200).json({ message: 'Form successfully deleted.', error: false });
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
