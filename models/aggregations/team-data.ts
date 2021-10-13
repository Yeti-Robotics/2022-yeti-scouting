export const teamDataAggregation = [
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
];

export interface TeamData {
	team_name: string;
	avgUpperAuto: number;
	positionControl: number;
	teamNumber: number;
}
