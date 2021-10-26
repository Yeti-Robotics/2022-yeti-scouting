import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import Form from '@/models/form';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const updatedForm = JSON.parse(req.body);
		await Form.findOneAndUpdate({ _id: updatedForm._id }, updatedForm);
		return res.status(200).json({ message: 'Form successfully updated.', error: false });
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
