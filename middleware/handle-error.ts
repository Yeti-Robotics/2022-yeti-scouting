import { NextApiResponse } from 'next';

const handleError = (res: NextApiResponse, err?: unknown, msg = 'Internal server error') => {
	console.error(err);
	return res.status(500).json({ message: msg, error: true });
};

export default handleError;
