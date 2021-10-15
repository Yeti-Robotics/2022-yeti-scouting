import { model, models, Schema } from 'mongoose';

const formSchema = new Schema(
	{
		id: { type: Number, index: { unique: true, sparse: true } },
		auto_low_missed_balls: { type: Number, required: true },
		auto_low_scored_balls: { type: Number, required: true },
		auto_upper_missed_balls: { type: Number, required: true },
		auto_upper_scored_balls: { type: Number, required: true },
		comment: { type: String, required: true },
		cross_initiation_line: { type: Boolean, required: true },
		defense: { type: Number, required: true },
		end_position: { type: Number, required: true },
		match_number: { type: Number, required: true },
		preload: { type: Number, required: true },
		scouter: { type: String, required: true },
		spill_balls: { type: Number, required: true },
		team_number: { type: Number, required: true },
		teleop_low_missed_balls: { type: Number, required: true },
		teleop_low_scored_balls: { type: Number, required: true },
		teleop_upper_missed_balls: { type: Number, required: true },
		teleop_upper_scored_balls: { type: Number, required: true },
		timestamp: { type: String, default: Date.now().toString() },
	},
	{ collection: 'form' },
);

export interface Form {
	id: number;
	auto_low_missed_balls: number;
	auto_low_scored_balls: number;
	auto_upper_missed_balls: number;
	auto_upper_scored_balls: number;
	comment: string;
	cross_initiation_line: boolean;
	defense: number;
	end_position: number;
	match_number: number;
	position_control: boolean;
	preload: number;
	rotation_control: boolean;
	scouter: string;
	spill_balls: number;
	team_number: number;
	teleop_low_missed_balls: number;
	teleop_low_scored_balls: number;
	teleop_upper_missed_balls: number;
	teleop_upper_scored_balls: number;
	timestamp: string;
}

export default models.form || model('form', formSchema);
