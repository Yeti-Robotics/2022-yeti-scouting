import {
	Checkbox,
	Input,
	Invalid,
	Section,
	Submit,
} from '@/components/ScoutingForm/ScoutingFormStyles';
import { User } from '@/models/user';
import { useForm } from 'react-hook-form';
import React from 'react';
import { EditUserWrapper } from './UserStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from './user-schema';
import { Field } from '../UsersStyles';
import { useRouter } from 'next/router';

interface EditUserProps {
	user: User;
}

const EditUser: React.FC<EditUserProps> = ({ user }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User & { newPassword: string }>({
		resolver: yupResolver(userSchema),
		defaultValues: user,
	});

	return (
		<EditUserWrapper
			onSubmit={handleSubmit((data) => {
				fetch('/api/admin/user/update', {
					method: 'PATCH',
					body: JSON.stringify({ ...user, ...data }), //replaces edited fields only ! (I love es6)
				}).then(() => {
					fetch('/api/is-authenticated').then((res) => {
						if (res.status !== 200) {
							router.push('/login?from=/admin/users');
						}
					});
				});
			})}
		>
			<Section>
				<h1>{user.username}</h1>

				<Field>
					<label>First Name</label>
					<Input {...register('firstName')} />
				</Field>
				<Field>
					<label>Last Name</label>
					<Input {...register('lastName')} />
				</Field>
				<Field>
					<label>Team #</label>
					<Input {...register('teamNumber', { valueAsNumber: true })} type='number' />
				</Field>
				<Field>
					<label>Administator?</label>
					<Checkbox {...register('administrator')} type='checkbox' />
				</Field>
				<Field>
					<label>New Password</label>
					<Input {...register('newPassword', { required: false })} />
					<Invalid>{errors.newPassword?.message}</Invalid>
				</Field>
			</Section>
			<Submit type='submit'>Update</Submit>
		</EditUserWrapper>
	);
};

export default EditUser;
