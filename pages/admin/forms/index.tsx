import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import useUser from '@/hooks/useUser';
import { NextPage } from 'next';
import React from 'react';
import Forms from '@/components/Forms';
import TopButton from '@/components/TopButton';

const FormsPage: NextPage = () => {
	const { user } = useUser({ redirectTo: '/login' });
	const isAdmin = user?.isLoggedIn && !user?.administrator;

	if (!user || !user.isLoggedIn) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	if (isAdmin) {
		return (
			<Layout>
				<h1>You are not authorized to access this page.</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<h1>Forms</h1>
			<Forms user={user} />
			<TopButton text='TOP' />
		</Layout>
	);
};

export default FormsPage;
