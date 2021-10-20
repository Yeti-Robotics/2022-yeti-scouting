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
			autoScore: {
				$add: [
					{
						$multiply: ['$auto_upper_scored_balls', 4],
					},
					{
						$multiply: ['$auto_low_scored_balls', 2],
					},
				],
			},
			teleopScore: {
				$add: [
					{
						$multiply: ['$teleop_upper_scored_balls', 2],
					},
					{
						$multiply: ['$teleop_low_scored_balls', 1],
					},
				],
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
			initiationLine: {
				$avg: {
					$multiply: [
						{
							$convert: {
								input: '$cross_initiation_line',
								to: 'int',
							},
						},
						100,
					],
				},
			},
			avgUpperAuto: {
				$avg: {
					$multiply: ['$avgUpperAuto', 100],
				},
			},
			avgLowerAuto: {
				$avg: {
					$multiply: ['$avgLowerAuto', 100],
				},
			},
			avgUpperTeleop: {
				$avg: {
					$multiply: ['$avgUpperTeleop', 100],
				},
			},
			avgLowerTeleop: {
				$avg: {
					$multiply: ['$avgLowerTeleop', 100],
				},
			},
			endPosition: {
				$avg: '$end_position',
			},
			autoScore: {
				$avg: '$autoScore',
			},
			teleopScore: {
				$avg: '$teleopScore',
			},
		},
	},
	{
		$sort: {
			_id: 1,
		},
	},
	{
		$project: {
			_id: 1,
			positionControl: 1,
			initiationLine: {
				$concat: [
					'%',
					{
						$toString: {
							$trunc: ['$initiationLine', 1],
						},
					},
				],
			},
			avgUpperAuto: {
				$concat: [
					'%',
					{
						$toString: {
							$trunc: ['$avgUpperAuto', 1],
						},
					},
				],
			},
			avgLowerAuto: {
				$concat: [
					'%',
					{
						$toString: {
							$trunc: ['$avgLowerAuto', 1],
						},
					},
				],
			},
			avgUpperTeleop: {
				$concat: [
					'%',
					{
						$toString: {
							$trunc: ['$avgUpperTeleop', 1],
						},
					},
				],
			},
			avgLowerTeleop: {
				$concat: [
					'%',
					{
						$toString: {
							$trunc: ['$avgLowerTeleop', 1],
						},
					},
				],
			},
			endPosition: {
				$round: '$endPosition',
			},
			avgAutoScore: {
				$round: ['$autoScore', 1],
			},
			avgTeleopScore: {
				$round: ['$teleopScore', 1],
			},
		},
	},
	{
		$addFields: {
			teamNumber: '$_id',
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
	{
		$limit: 100,
	},
];

export interface TeamData {
	team_name: string;
	initiationLine: string;
	avgUpperAuto: string;
	avgLowerAuto: string;
	avgUpperTeleop: string;
	avgLowerTeleop: string;
	avgAutoScore: number;
	avgTeleopScore: number;
	positionControl: number;
	endPosition: number;
	teamNumber: number;
}
