import React, { useState } from 'react';
import { Field, Input, Invalid, Section, Submit } from '../ScoutingForm/ScoutingFormStyles';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from '../Modal';
import { useRouter } from 'next/router';

const defaultOptions = {
	required: true,
	minLength: 2,
};

const schema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'Must have at least 4 charachters')
		.required('This field is required'),
	password: Yup.string()
		.min(4, 'Must have at least 4 charachters')
		.required('This field is required'),
	confirmPass: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
	firstName: Yup.string()
		.min(2, 'Must have at least 2 charachters')
		.required('This field is required'),
	lastName: Yup.string()
		.min(2, 'Must have at least 2 charachters')
		.required('This field is required'),
	teamNumber: Yup.number().max(9999).required('This field is required'),
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
	const router = useRouter();

	return (
		<form
			onSubmit={handleSubmit((data) => {
				fetch('/api/user/validate-username', {
					method: 'POST',
					body: JSON.stringify(data),
				}).then(async (res) => {
					const json = await res.json();
					if (json.exists) return setModal(true);
					fetch(json.message, { method: 'POST', body: JSON.stringify(data) }).then(() => {
						router.push('/login');
					});
				});
			})}
			style={{ width: 'clamp(300px, 2400px, 100%)', display: 'grid', placeItems: 'center' }}
		>
			<Modal state={[modal, setModal]}>
				<p>This username is already in use</p>
			</Modal>

			<Section>
				<h1>Register</h1>

				<Field>
					<label>Team Number:</label>
					<Input
						{...register('teamNumber', { ...defaultOptions, maxLength: 4 })}
						id='teamNumber'
					/>
					{errors.teamNumber?.message && <Invalid>{errors.teamNumber?.message}</Invalid>}
				</Field>
				<Field>
					<label>First Name (min length of 2):</label>
					<Input {...register('firstName', defaultOptions)} id='firstName' />
					{errors.firstName?.message && <Invalid>{errors.firstName?.message}</Invalid>}
				</Field>
				<Field>
					<label>Last Name (min length of 2):</label>
					<Input {...register('lastName', defaultOptions)} id='lastName' />
					{errors.lastName?.message && <Invalid>{errors.lastName?.message}</Invalid>}
				</Field>
				<Field>
					<label>Username (min length of 4):</label>
					<Input
						{...register('username', { ...defaultOptions, minLength: 4 })}
						id='username'
					/>
					{errors.username?.message && <Invalid>{errors.username?.message}</Invalid>}
				</Field>
				<Field>
					<label>Password (min length of 4):</label>
					<Input
						{...register('password', { ...defaultOptions, minLength: 4 })}
						type='password'
						id='password'
					/>
					{errors.password?.message && <Invalid>{errors.password?.message}</Invalid>}
				</Field>
				<Field>
					<label>Confirm Password:</label>
					<Input {...register('confirmPass')} type='password' />
					{errors.confirmPass?.message && (
						<Invalid>{errors.confirmPass?.message}</Invalid>
					)}
				</Field>
			</Section>
			<Submit type='submit' />
		</form>
	);
};

export default Register;
