import administrator from '@/middleware/administrator';
import handleError from '@/middleware/handle-error';
import Form from '@/models/form';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	try {
		const filter: { [key: string]: any } = req.query || {};
		const purifiedFilter: { [key: string]: any } = {};
		Object.keys(filter).forEach((key) => {
			const prop = filter[key];
			if (key === 'by' || key === 'from') return;
			if (prop === '') return;
			purifiedFilter[key] = prop;
		});
		const forms = await Form.find(purifiedFilter);
		return res.status(200).json(forms);
	} catch (err) {
		return handleError(res);
	}
};

export default administrator(handler, false);
