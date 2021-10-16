import React, { useState } from 'react';
import { Field, Input, Invalid, Section, Submit } from '../ScoutingForm/ScoutingFormStyles';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from '../Modal';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User & { confirmPass: string }>({
		resolver: yupResolver(schema),
	});

	const [modal, setModal] = useState(false);

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
				fetch('/api/user/validate-username', {
					method: 'POST',
					body: JSON.stringify(data),
				}).then(async (res) => {
					const json = await res.json();
					if (json.exists) {
						setModal(true);
					} else {
						console.log('user created');
					}
				});
			})}
			style={{ display: 'grid', placeItems: 'center' }}
		>
			<Modal state={[modal, setModal]} />

			<Section>
				<h1>Register</h1>

				<Field>
					<label>Team Number:</label>
					<Input
						{...register('teamNumber', { ...defaultOptions, maxLength: 4 })}
						id='teamNumber'
					/>
					{errors.teamNumber?.message && <Invalid>Team number invalid</Invalid>}
				</Field>
				<Field>
					<label>First Name (min length of 2):</label>
					<Input {...register('firstName', defaultOptions)} id='firstName' />
					{errors.firstName?.message && <Invalid>Password invalid</Invalid>}
				</Field>
				<Field>
					<label>Last Name (min length of 2):</label>
					<Input {...register('lastName', defaultOptions)} id='lastName' />
					{errors.lastName?.message && <Invalid>Last name invalid</Invalid>}
				</Field>
				<Field>
					<label>Username (min length of 4):</label>
					<Input
						{...register('username', { ...defaultOptions, minLength: 4 })}
						id='username'
					/>
					{errors.username?.message && <Invalid>Username invalid</Invalid>}
				</Field>
				<Field>
					<label>Password (min length of 4):</label>
					<Input
						{...register('password', { ...defaultOptions, minLength: 4 })}
						type='password'
						id='password'
					/>
					{errors.password?.message && <Invalid>Password invalid</Invalid>}
				</Field>
				<Field>
					<label>Confirm Password:</label>
					<Input {...register('confirmPass')} type='password' />
					{errors.confirmPass?.message && <Invalid>Passwords must match</Invalid>}
				</Field>
			</Section>
			<Submit type='submit' />
		</form>
	);
};

export default Register;
