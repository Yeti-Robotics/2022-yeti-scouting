import React from 'react';
import { FormCardWrapper } from './UsersStyles';
import Link from 'next/link';
import { User } from '@/models/user';

interface FormCardProps {
	user: User;
}

const FormCard: React.FC<FormCardProps> = ({ user }) => {
	return (
		<Link href={`/admin/users/${user.username}`} passHref>
			<FormCardWrapper>
				<h1>{user.username}</h1>
			</FormCardWrapper>
		</Link>
	);
};

export default FormCard;
