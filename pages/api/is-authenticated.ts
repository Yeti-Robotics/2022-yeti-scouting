import authenticate from '@/middleware/authenticate';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
	const { username, administrator, teamNumber, firstName, lastName } = JSON.parse(req.body);
	return res
		.status(200)
		.json({ username, administrator, teamNumber, firstName, lastName, isLoggedIn: true });
};

export default authenticate(handler);
