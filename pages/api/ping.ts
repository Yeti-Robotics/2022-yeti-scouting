import authenticate from '@/middleware/authenticate';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
	res.setHeader('Chache-Control', 'no-store');
	return res.status(200).send('');
};

export default authenticate(handler);
