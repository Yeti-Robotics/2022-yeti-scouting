import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const form = new Form({ ...JSON.parse(req.body), scouter: 'isaiah' });
		await form.save((err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: 'Internal server error.' });
			}
		});
		return res.status(200).json({ message: 'Form succesfully saved.' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};

export default connectDB(handler);
