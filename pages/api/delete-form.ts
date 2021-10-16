import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';
import handleError from '@/middleware/handle-error';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'DELETE')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		Form.findOneAndDelete({ _id: JSON.parse(req.body) }, (err: unknown) => {
			if (err) {
				console.error(err);
				return res
					.status(404)
					.json({ message: 'Internal server error or document not found.', error: true });
			}
			return res
				.status(200)
				.json({ message: 'Document removed successfully.', error: false });
		});
	} catch (err) {
		return handleError(res, err);
	}
};

export default connectDB(handler);
