import React from 'react';
import { Field, Input, Section, Submit } from '../ScoutingForm/ScoutingFormStyles';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';

const defaultOptions = {
	required: true,
};

const Login: React.FC = () => {
	const { register, handleSubmit } = useForm<User>();

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
				fetch('api/login', {
					method: 'POST',
					body: JSON.stringify({ ...data, administator: false }),
				})
					.then((res) => res.json())
					.then((json) => {});
			})}
		>
			<Section>
				<h1>Login</h1>

				<Field>
					<label>Username:</label>
					<Input {...register('username', defaultOptions)} id='username' />
				</Field>
				<Field>
					<label>Password:</label>
					<Input
						{...register('password', defaultOptions)}
						type='password'
						id='password'
					/>
				</Field>

				<Submit type='submit' />
			</Section>
		</form>
	);
};

export default Login;