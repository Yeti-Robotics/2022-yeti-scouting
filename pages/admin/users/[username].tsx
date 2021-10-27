import Layout from '@/components/Layout';
import User from '@/components/Users/User';
import useUser from '@/hooks/useUser';
import { NextPage } from 'next';
import React from 'react';

const UserPage: NextPage = () => {
	const { user } = useUser({ redirectTo: '/login' });

	return (
		<Layout>
			<User user={user} />
		</Layout>
	);
};

export default UserPage;
