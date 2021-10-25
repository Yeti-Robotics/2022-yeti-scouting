import { Control, Controller } from 'react-hook-form';
import React from 'react';
import { ScoreInputStyles } from './ScoutingFormStyles';

/* Typescript was broken in here :pensive: */

interface ScoreInputProps {
	label: string;
	name: string;
	control: Control<any, object>;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ label, name, control, ...inputProps }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={0}
			render={({ field: { value, onChange, name, ref } }) => (
				<>
					<label>{label}</label>
					<ScoreInputStyles>
						<button
							style={{ left: -40, borderRadius: '3px 0 0 3px' }}
							type='button'
							disabled={value < 1}
							// eslint-disable-next-line prettier/prettier
							onClick={() => onChange(value - 1)}
						>
							-
						</button>
						<input
							type='number'
							name={name}
							value={value}
							ref={ref}
							disabled
							{...inputProps}
						/>
						<button
							style={{ right: -40 }}
							type='button'
							onClick={() => onChange(value + 1)}
						>
							+
						</button>
					</ScoreInputStyles>
				</>
			)}
		/>
	);
};

export default ScoreInput;
