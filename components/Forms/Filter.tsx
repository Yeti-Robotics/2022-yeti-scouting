import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '@/models/form';
import { Field, FilterForm, FilterWrapper, Submit } from './FormsStyles';
import { Invalid } from '../ScoutingForm/ScoutingFormStyles';

interface FilterProps {
	setQuery: React.Dispatch<React.SetStateAction<any>>;
}

const Filter: React.FC<FilterProps> = ({ setQuery }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Omit<Form, 'comment'>>({
		shouldUnregister: false,
	});

	return (
		<FilterWrapper>
			<FilterForm
				onSubmit={handleSubmit((data) => {
					console.log(data);
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
				<Field>
					<label>Preload</label>
					<input
						{...register('preload', { required: false })}
						id='preload'
						type='number'
						autoComplete='off'
					/>
					{errors.preload?.message && <Invalid>{errors.preload?.message}</Invalid>}
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
