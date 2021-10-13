import { model, models, Schema } from 'mongoose';

const formSchema = new Schema(
	{
		id: {
			type: Number,
		},
		auto_low_missed_balls: {
			type: Number,
		},
		auto_low_scored_balls: {
			type: Number,
		},
		auto_upper_missed_balls: {
			type: Number,
		},
		auto_upper_scored_balls: {
			type: Number,
		},
		comment: {
			type: String,
		},
		cross_initiation_line: {
			type: Boolean,
		},
		defense: {
			type: Number,
		},
		end_position: {
			type: Number,
		},
		match_number: {
			type: Number,
		},
		position_control: {
			type: Boolean,
		},
		preload: {
			type: Number,
		},
		rotation_control: {
			type: Boolean,
		},
		scouter: {
			type: String,
		},
		spill_balls: {
			type: Number,
		},
		team_number: {
			type: Number,
		},
		teleop_low_missed_balls: {
			type: Number,
		},
		teleop_low_scored_balls: {
			type: Number,
		},
		teleop_upper_missed_balls: {
			type: Number,
		},
		teleop_upper_scored_balls: {
			type: Number,
		},
		timestamp: {
			type: String,
			default: Date.now().toString(),
		},
	},
	{ collection: 'form' },
);

export default models.form || model('form', formSchema);
