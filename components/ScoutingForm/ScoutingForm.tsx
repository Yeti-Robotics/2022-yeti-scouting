import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/models/form';
import { Checkbox, Field, Input, HoriSelect, Section, Submit, Select } from './ScoutingFormStyles';
import ScoreInput from './ScoreInput';

const defaultOptions = {
	required: true,
	max: 9999,
	min: 0,
};

const ScoutingForm = () => {
	const { register, handleSubmit, control } = useForm<Form>();

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
			style={{ width: 'clamp(300px, 2400px, 100%)', display: 'grid', placeItems: 'center' }}
		>
			{/* Match Info */}
			<Section>
				<h1>Match Info</h1>

				<Field>
					<label htmlFor='team_number'>Team Number:</label>
					<Input
						{...register('team_number', { ...defaultOptions, valueAsNumber: true })}
						type='number'
						id='team_number'
						autoComplete='off'
					/>
				</Field>
				<Field>
					<label htmlFor='match_number'>Match Number:</label>
					<Input
						{...register('match_number', { ...defaultOptions, valueAsNumber: true })}
						type='number'
						id='match_number'
						autoComplete='off'
					/>
				</Field>
			</Section>

			{/* Autonomous */}
			<Section>
				<h1>Autonomous</h1>

				<Field>
					<label htmlFor='preload'>How many balls were preloaded?</label>
					<HoriSelect
						{...register('preload', { ...defaultOptions, valueAsNumber: true })}
						id='preload'
						size={4}
						defaultValue={0}
					>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3} style={{ border: 0 }}>
							3
						</option>
					</HoriSelect>
				</Field>
				<Field>
					<label htmlFor='cross_initiaion_line'>
						Did the robot cross the initiation line? (moved)
					</label>
					<Checkbox
						{...register('cross_initiation_line')}
						type='checkbox'
						id='cross_initiation_line'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in upper:'
						name='auto_upper_scored_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in upper:'
						name='auto_upper_missed_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in lower:'
						name='auto_low_scored_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in lower:'
						name='auto_low_missed_balls'
					/>
				</Field>
				<Field>
					<label htmlFor='spill_balls'>Ball spilled?</label>
					<HoriSelect
						{...register('spill_balls', { ...defaultOptions, valueAsNumber: true })}
						id='spill_balls'
						size={3}
						defaultValue={0}
					>
						<option value={0}>None</option>
						<option value={1}>Some balls</option>
						<option value={2} style={{ border: 0 }}>
							Into another robot
						</option>
					</HoriSelect>
				</Field>
			</Section>

			{/* TeleOp */}
			<Section>
				<h1>TeleOp</h1>

				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in upper:'
						name='teleop_upper_scored_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in upper:'
						name='teleop_upper_missed_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in lower'
						name='teleop_low_scored_balls'
					/>
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in lower'
						name='teleop_low_missed_balls'
					/>
				</Field>
				<Field>
					<label style={{ fontSize: '1.5rem' }}>
						How was their defense(0 is none, 1 or 2 if they got a penalty, 3+ if it was
						good)
					</label>
					<HoriSelect
						{...register('defense', { ...defaultOptions, valueAsNumber: true })}
						id='spill_balls'
						size={5}
						defaultValue={0}
					>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4} style={{ border: 0 }}>
							4
						</option>
					</HoriSelect>
				</Field>
				<Field>
					<label>End Position</label>
					<Select
						{...register('end_position', { ...defaultOptions, valueAsNumber: true })}
						defaultValue={0}
					>
						<option value={0}>Nothing</option>
						<option value={1}>Parked</option>
						<option value={2}>Buddy climb got lifted</option>
						<option value={3}>Buddy climb lifed</option>
						<option value={4}>Solo not level</option>
						<option value={5}>Solo level</option>
					</Select>
				</Field>
			</Section>

			{/* Other */}
			<Section>
				<h1>Other</h1>

				<Field>
					<label htmlFor='comment'>Comments</label>
					<textarea
						{...register('comment', { ...defaultOptions, maxLength: 500 })}
						id='comment'
						autoComplete='off'
					/>
					<p>Add comments about strategy, failures, human players, fouls, etc.</p>
				</Field>
			</Section>

			<Submit type='submit' />
		</form>
	);
};

export default ScoutingForm;
