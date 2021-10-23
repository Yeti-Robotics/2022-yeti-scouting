import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import Form from '@/models/form';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const filter: { [key: string]: any } = req.query || {};
		console.log(filter);
		const forms = await Form.find(filter);
		return res.status(200).json(forms);
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
