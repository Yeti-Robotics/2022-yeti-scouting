import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, NumForm } from '@/models/form';
import { Field, FilterForm, FilterWrapper, Submit } from './FormsStyles';
import { Invalid, Select } from '../ScoutingForm/ScoutingFormStyles';

interface FilterProps {
	setQuery: React.Dispatch<React.SetStateAction<any>>;
	setSort: React.Dispatch<React.SetStateAction<{ by: keyof NumForm; from: 1 | -1 }>>;
}

const Filter: React.FC<FilterProps> = ({ setQuery, setSort }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Omit<Form, 'comment'> & { by: keyof NumForm; from: 1 | -1 }>({
		shouldUnregister: false,
	});

	return (
		<FilterWrapper>
			<FilterForm
				onSubmit={handleSubmit((data) => {
					setSort({ by: data.by, from: data.from });
					setQuery(data);
				})}
			>
				<Field>
					<label>Team Number</label>
					<input
						{...register('team_number', { required: false })}
						id='team_number'
						type='number'
						autoComplete='off'
					/>
					{errors.team_number?.message && (
						<Invalid>{errors.team_number?.message}</Invalid>
					)}
				</Field>
				<Field>
					<label>Match Number</label>
					<input
						{...register('match_number', { required: false })}
						id='match_number'
						type='number'
						autoComplete='off'
					/>
					{errors.match_number?.message && (
						<Invalid>{errors.match_number?.message}</Invalid>
					)}
				</Field>
				{/* {<Field>
					<label>Preload</label>
					<input
						{...register('preload', { required: false })}
						id='preload'
						type='number'
						autoComplete='off'
					/>
					{errors.preload?.message && <Invalid>{errors.preload?.message}</Invalid>}
				</Field>} */}

				<Field>
					<label>Sort By</label>
					<Select
						{...register('by', { required: false })}
						style={{ width: 200 }}
						defaultValue='match_number'
					>
						<option value='match_number'>Match Number</option>
						<option value='team_number'>Team Number</option>
						<option value='preload'>Preload</option>
						<option value='spill_balls'>Spilled Balls</option>
						<option value='end_position'>End Position</option>
						<option value='defense'>Defense</option>
						<option value='auto_upper_scored_balls'>Auto Upper Scored</option>
						<option value='auto_upper_missed_balls'>Auto Upper Missed</option>
						<option value='auto_low_scored_balls'>Auto Lower Scored</option>
						<option value='auto_low_missed_balls'>Auto Lower Scored</option>
						<option value='teleop_upper_scored_balls'>Teleop Upper Scored</option>
						<option value='teleop_upper_missed_balls'>Teleop Upper Missed</option>
						<option value='teleop_low_scored_balls'>Teleop Lower Scored</option>
						<option value='teleop_low_missed_balls'>Teleop Lower Missed</option>
					</Select>
				</Field>
				<Field>
					<label>Sort From</label>
					<Select
						{...register('from', { required: false, valueAsNumber: true })}
						style={{ width: 200 }}
						defaultValue={1}
					>
						<option value={1}>High to Low</option>
						<option value={-1}>Low to High</option>
					</Select>
				</Field>

				<div style={{ display: 'grid', placeItems: 'center', rowGap: '1rem' }}>
					<Submit type='submit'>Search</Submit>
					<Submit type='button' onClick={() => reset()}>
						Reset
					</Submit>
				</div>
			</FilterForm>
		</FilterWrapper>
	);
};

export default Filter;
