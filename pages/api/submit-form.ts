import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';
import handleError from '@/middleware/handle-error';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const form = new Form({ ...JSON.parse(req.body), scouter: 'isaiah' });
		await form.save((err: unknown) => {
			if (err) return handleError(res, err);
			return res
				.status(200)
				.json({ message: 'Form succesfully saved.', id: form._id, error: false });
		});
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
