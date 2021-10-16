import React from 'react';
import { Field, Input, Section, Submit } from '../ScoutingForm/ScoutingFormStyles';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const defaultOptions = {
	required: true,
	minLength: 2,
};

const schema = Yup.object().shape({
	username: Yup.string().min(4).required(),
	password: Yup.string().min(4).required(),
	confirmPass: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
	firstName: Yup.string().min(2).required(),
	lastName: Yup.string().min(2).required(),
	teamNumber: Yup.number().max(9999).required(),
});

const Register = () => {
	const { register } = useForm<User & { confirmPass: string }>({
		resolver: yupResolver(schema),
	});

	return (
		<form>
			<Section>
				<h1>Register</h1>

				<Field>
					<label>Team Number:</label>
					<Input
						{...register('teamNumber', { ...defaultOptions, maxLength: 4 })}
						id='teamNumber'
					/>
				</Field>
				<Field>
					<label>First Name (min length of 2):</label>
					<Input {...register('firstName', defaultOptions)} id='firstName' />
				</Field>
				<Field>
					<label>Last Name (min length of 2):</label>
					<Input {...register('lastName', defaultOptions)} id='lastName' />
				</Field>
				<Field>
					<label>Username (min length of 4):</label>
					<Input
						{...register('username', { ...defaultOptions, minLength: 4 })}
						id='username'
					/>
				</Field>
				<Field>
					<label>Password (min length of 4):</label>
					<Input
						{...register('password', { ...defaultOptions, minLength: 4 })}
						type='password'
						id='password'
					/>
				</Field>
				<Field>
					<label>Last Name:</label>
					<Input {...register('confirmPass')} type='password' />
				</Field>

				<Submit type='submit' />
			</Section>
		</form>
	);
};

export default Register;
