import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/models/form';
import {
	Checkbox,
	Field,
	Input,
	HoriSelect,
	Section,
	Submit,
	Select,
	Invalid,
} from './ScoutingFormStyles';
import ScoreInput from './ScoreInput';
import StatusModal from './StatusModal';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
	team_number: Yup.number()
		.min(1, 'Must be above 0')
		.max(9999, 'Must be below 10000')
		.required('This field is required')
		.typeError('Must be a number'),
	match_number: Yup.number()
		.min(0, 'Must be above -1')
		.max(9999, 'Must be below 10000')
		.required('This field is required')
		.typeError('Must be a number'),
	preload: Yup.number()
		.min(0, 'Must be above -1')
		.max(3, 'Must be be below 4')
		.required('This field is required')
		.typeError('Must be a number'),
	cross_initiation_line: Yup.bool(),
	auto_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	spill_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(2, 'Must be below 3')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	defense: Yup.number()
		.min(0, 'Must be above -1')
		.max(2, 'Must be below 5')
		.required('This field is required')
		.typeError('Must be a number'),
	comment: Yup.string().max(500, 'Max of 500 characters').required('This field is required'),
});

interface ScoutingFormProps {
	scouter: string;
}

const ScoutingForm: React.FC<ScoutingFormProps> = ({ scouter }) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<Form>({
		resolver: yupResolver(schema),
	});
	const [lastForm, setLastForm] = useState<{ message: string; id?: string; error: boolean }>();

	const onSubmit = (data: Form) => {
		fetch('/api/submit-form', { method: 'POST', body: JSON.stringify({ ...data, scouter }) })
			.then((res) => res.json())
			.then((json) => setLastForm(json));
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ width: 'clamp(300px, 2400px, 100%)', display: 'grid', placeItems: 'center' }}
		>
			<StatusModal submitted={lastForm} setSubmitted={setLastForm} />

			{/* Match Info */}
			<Section>
				<h1>Match Info</h1>

				<Field>
					<label htmlFor='team_number'>Team Number:</label>
					<Input
						{...register('team_number')}
						type='number'
						id='team_number'
						autoComplete='off'
					/>
					{errors.team_number?.message && (
						<Invalid>{errors.team_number?.message}</Invalid>
					)}
				</Field>
				<Field>
					<label htmlFor='match_number'>Match Number:</label>
					<Input
						{...register('match_number')}
						type='number'
						id='match_number'
						autoComplete='off'
					/>
					{errors.match_number?.message && (
						<Invalid>{errors.match_number?.message}</Invalid>
					)}
				</Field>
			</Section>

			{/* Autonomous */}
			<Section>
				<h1>Autonomous</h1>

				<Field>
					<label htmlFor='preload'>How many balls were preloaded?</label>
					<HoriSelect {...register('preload')} id='preload' size={4} defaultValue={0}>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3} style={{ border: 0 }}>
							3
						</option>
					</HoriSelect>
					{errors.preload?.message && <Invalid>{errors.preload?.message}</Invalid>}
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
					{errors.cross_initiation_line?.message && (
						<Invalid>{errors.cross_initiation_line?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in upper:'
						name='auto_upper_scored_balls'
					/>
					{errors.auto_upper_scored_balls?.message && (
						<Invalid>{errors.auto_upper_scored_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in upper:'
						name='auto_upper_missed_balls'
					/>
					{errors.auto_upper_missed_balls?.message && (
						<Invalid>{errors.auto_upper_missed_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in lower:'
						name='auto_low_scored_balls'
					/>
					{errors.auto_low_scored_balls?.message && (
						<Invalid>{errors.auto_low_scored_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in lower:'
						name='auto_low_missed_balls'
					/>
					{errors.auto_low_missed_balls?.message && (
						<Invalid>{errors.auto_low_missed_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<label htmlFor='spill_balls'>Ball spilled?</label>
					<HoriSelect
						{...register('spill_balls')}
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
					{errors.spill_balls?.message && (
						<Invalid>{errors.spill_balls?.message}</Invalid>
					)}
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
					{errors.teleop_upper_scored_balls?.message && (
						<Invalid>{errors.teleop_upper_scored_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in upper:'
						name='teleop_upper_missed_balls'
					/>
					{errors.teleop_upper_missed_balls?.message && (
						<Invalid>{errors.teleop_upper_missed_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls scored in lower'
						name='teleop_low_scored_balls'
					/>
					{errors.teleop_low_scored_balls?.message && (
						<Invalid>{errors.teleop_low_scored_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<ScoreInput
						control={control}
						label='Balls missed in lower'
						name='teleop_low_missed_balls'
					/>
					{errors.teleop_low_missed_balls?.message && (
						<Invalid>{errors.teleop_low_missed_balls?.message}</Invalid>
					)}
				</Field>
				<Field>
					<label style={{ fontSize: '1.5rem' }}>
						How was their defense(0 is none, 1 or 2 if they got a penalty, 3+ if it was
						good)
					</label>
					<HoriSelect {...register('defense')} id='defense' size={5} defaultValue={0}>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4} style={{ border: 0 }}>
							4
						</option>
					</HoriSelect>
					{errors.defense?.message && <Invalid>{errors.defense?.message}</Invalid>}
				</Field>
				<Field>
					<label>End Position</label>
					<Select {...register('end_position')} defaultValue={0}>
						<option value={0}>Nothing</option>
						<option value={1}>Parked</option>
						<option value={2}>Buddy climb got lifted</option>
						<option value={3}>Buddy climb lifed</option>
						<option value={4}>Solo not level</option>
						<option value={5}>Solo level</option>
					</Select>
					{errors.end_position?.message && (
						<Invalid>{errors.end_position?.message}</Invalid>
					)}
				</Field>
			</Section>

			{/* Other */}
			<Section>
				<h1>Other</h1>

				<Field>
					<label htmlFor='comment'>{`Comments (${
						watch('comment')?.length || 0
					}/500)`}</label>
					<textarea {...register('comment')} id='comment' autoComplete='off' />
					{errors.comment?.message && <Invalid>{errors.comment?.message}</Invalid>}
					<p>Add comments about strategy, failures, human players, fouls, etc.</p>
				</Field>
			</Section>

			<Submit type='submit' />
		</form>
	);
};

export default ScoutingForm;
