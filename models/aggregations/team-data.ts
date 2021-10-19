export const teamDataAggregation = [
	{
		$addFields: {
			autoTotalUpperBalls: {
				$add: ['$auto_upper_scored_balls', '$auto_upper_missed_balls'],
			},
			autoTotalLowerBalls: {
				$add: ['$auto_low_scored_balls', '$auto_low_missed_balls'],
			},
			teleopTotalLowerBalls: {
				$add: ['$teleop_low_scored_balls', '$teleop_low_missed_balls'],
			},
			teleopTotalUpperBalls: {
				$add: ['$teleop_upper_scored_balls', '$teleop_upper_missed_balls'],
			},
		},
	},
	{
		$addFields: {
			avgUpperAuto: {
				$cond: [
					{
						$eq: ['$autoTotalUpperBalls', 0],
					},
					0,
					{
						$divide: ['$auto_upper_scored_balls', '$autoTotalUpperBalls'],
					},
				],
			},
			avgLowerAuto: {
				$cond: [
					{
						$eq: ['$autoTotalLowerBalls', 0],
					},
					0,
					{
						$divide: ['$auto_low_scored_balls', '$autoTotalLowerBalls'],
					},
				],
			},
			avgUpperTeleop: {
				$cond: [
					{
						$eq: ['$teleopTotalUpperBalls', 0],
					},
					0,
					{
						$divide: ['$teleop_upper_scored_balls', '$teleopTotalUpperBalls'],
					},
				],
			},
			avgLowerTeleop: {
				$cond: [
					{
						$eq: ['$teleopTotalLowerBalls', 0],
					},
					0,
					{
						$divide: ['$teleop_low_scored_balls', '$teleopTotalLowerBalls'],
					},
				],
			},
		},
	},
	{
		$group: {
			_id: '$team_number',
			positionControl: {
				$avg: {
					$convert: {
						input: '$position_control',
						to: 'int',
					},
				},
			},
			avgUpperAuto: {
				$avg: '$avgUpperAuto',
			},
			avgLowerAuto: {
				$avg: '$avgLowerAuto',
			},
			avgUpperTeleop: {
				$avg: '$avgUpperTeleop',
			},
			avgLowerTeleop: {
				$avg: '$avgLowerTeleop',
			},
			endPosition: {
				$avg: '$end_position',
			},
		},
	},
	{
		$project: {
			_id: 1,
			positionControl: 1,
			avgUpperAuto: 1,
			avgLowerAuto: 1,
			avgUpperTeleop: 1,
			avgLowerTeleop: 1,
			endPosition: {
				$round: '$endPosition',
			},
		},
	},
	{
		$addFields: {
			teamNumber: '$_id',
		},
	},
	{
		$sort: {
			teamNumber: 1,
		},
	},
	{
		$lookup: {
			from: 'team',
			localField: 'teamNumber',
			foreignField: 'team_number',
			as: 'team',
		},
	},
	{
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
		$project: {
			_id: 0,
			team: 0,
			team_number: 0,
		},
	},
];

export interface TeamData {
	team_name: string;
	avgUpperAuto: number;
	avgLowerAuto: number;
	avgUpperTeleop: number;
	avgLowerTeleop: number;
	positionControl: number;
	endPosition: number;
	teamNumber: number;
}
