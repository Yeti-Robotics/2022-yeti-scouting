import React from 'react';
import { useForm } from 'react-hook-form';
import { Field, FilterForm, FilterWrapper, Submit } from './UsersStyles';
import { Invalid, Select } from '../ScoutingForm/ScoutingFormStyles';
import { User } from '@/hooks/useUser';

interface FilterProps {
	setQuery: React.Dispatch<React.SetStateAction<any>>;
	setSort: React.Dispatch<React.SetStateAction<{ by: 'teamNumber'; from: 1 | -1 }>>;
}

const Filter: React.FC<FilterProps> = ({ setQuery, setSort }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<User & { by: 'teamNumber'; from: 1 | -1 }>({
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
						{...register('teamNumber', { required: false })}
						id='team_number'
						type='number'
						autoComplete='off'
					/>
					{errors.teamNumber?.message && <Invalid>{errors.teamNumber?.message}</Invalid>}
				</Field>

				<Field>
					<label>Sort By</label>
					<Select
						{...register('by', { required: false })}
						style={{ width: 200 }}
						defaultValue='teamNumber'
					>
						<option value='teamNumber'>Team Number</option>
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
