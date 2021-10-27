import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import User from '@/models/user';
import Token from '@/models/token';
import { NextApiHandler } from 'next';
import bcrypt from 'bcrypt';

const handler: NextApiHandler = async (req, res) => {
	try {
		let user = JSON.parse(req.body);
		if (user.newPassword) {
			const salt = await bcrypt.genSalt(10);
			const password = await bcrypt.hash(user.newPassword, salt);
			user = {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				teamNumber: user.teamNumber,
				administrator: user.administrator,
				password: password,
			};
			await Token.findOneAndDelete({ username: user.username });
		}
		await User.findOneAndUpdate({ username: user.username }, user);
		return res.status(200).json({ message: 'Form successfully deleted.', error: false });
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
