// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '@/middleware/database';
import authenticate from '@/middleware/authenticate';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';
import { teamDataAggregation } from '@/models/aggregations/team-data';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const teams = await Form.aggregate(teamDataAggregation);
		return res.status(200).json(teams);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};

export default authenticate(connectDB(handler));
