import React, { useState } from 'react';
import {
	Field,
	Input,
	Invalid,
	Register,
	Section,
	Submit,
} from '../ScoutingForm/ScoutingFormStyles';
import { useForm } from 'react-hook-form';
import { User } from '@/models/user';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Modal from '../Modal';
import Link from 'next/link';

const schema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'Must have at least 4 characters')
		.required('This field is required'),
	password: Yup.string()
		.min(4, 'Must have at least 4 characters')
		.required('This field is required'),
});

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		resolver: yupResolver(schema),
	});
	const [modal, setModal] = useState(false);
	const router = useRouter();

	return (
		<form
			onSubmit={handleSubmit(async (data) => {
				const res = await fetch('api/user/login', {
					method: 'POST',
					body: JSON.stringify(data),
				});

				if (res.status === 400) return setModal(true);
				if (res.status > 400) return;
				router.push(router.query.from ? String(router.query.from) : '/');
			})}
			style={{ width: 'clamp(300px, 2400px, 100%)', display: 'grid', placeItems: 'center' }}
		>
			<Modal state={modal}>Username or password is incorrect.</Modal>
			<Section>
				<h1>Login</h1>

				<Field>
					<label>Username:</label>
					<Input {...register('username')} id='username' />
					{errors.username?.message && <Invalid>{errors.username?.message}</Invalid>}
				</Field>
				<Field>
					<label>Password:</label>
					<Input {...register('password')} type='password' id='password' />
					{errors.password?.message && <Invalid>{errors.password?.message}</Invalid>}
				</Field>
			</Section>
			<Submit type='submit'>Submit</Submit>
			<Link href='/register' passHref>
				<a style={{ width: '95%' }}>
					<Register>Register Here!</Register>
				</a>
			</Link>
		</form>
	);
};

export default Login;
