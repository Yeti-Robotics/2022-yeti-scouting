// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '@/middleware/database';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Form from '@/models/form';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET')
		return res.status(405).json({ message: `${!req.method} is not allowed on this route.` });
	try {
		const teams = await Form.aggregate([
			{
				// grouping the results by team number
				$group: {
					_id: '$team_number',
					avgUpperAuto: {
						$avg: '$auto_upper_scored_balls',
					},
					positionControl: {
						$avg: {
							$convert: {
								input: '$position_control',
								to: 'int',
							},
						},
					},
				},
			},
			{
				// adds the teamNumber field
				$addFields: {
					teamNumber: '$_id',
				},
			},
			{
				// sorts in ascending order by teamNumber
				$sort: {
					teamNumber: 1,
				},
			},
			{
				// joining the team based on the teamNumber
				$lookup: {
					from: 'team',
					localField: 'teamNumber',
					foreignField: 'team_number',
					as: 'team',
				},
			},
			{
				// merging the team object with the returned document
				$replaceRoot: {
					newRoot: {
						$mergeObjects: [
							{
								$arrayElemAt: ['$team', 0],
							},
							'$$ROOT',
						],
					},
				},
			},
			{
				// removing the _id and team fields
				$project: {
					_id: 0,
					team: 0,
				},
			},
		]);
		return res.status(200).json(teams);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};

export default connectDB(handler);
