import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import Form from '@/models/form';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const id = req.query.id;
		if (!id) {
			return res.status(400).json({ message: 'Awating hydration.' });
		}
		const forms = await Form.findById(id);
		return res.status(200).json(forms);
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
