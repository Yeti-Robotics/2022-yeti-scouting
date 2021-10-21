import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';
import { teamDataAggregation } from '@/models/aggregations/team-data';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET')
		return res.status(405).json({ message: `${req.method} is not allowed on this route.` });
	try {
		const filter = req.query.number;
		if (!filter) {
			return res.status(400).json({ message: 'Awating hydration.' });
		}
		const team = await Form.aggregate([
			...teamDataAggregation,
			{ $match: { teamNumber: parseInt(filter.toString()) } },
		]);
		const forms = await Form.find({ team_number: parseInt(filter.toString()) });
		return res.status(200).json({ team: team[0], forms });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};

export default connectDB(handler);
