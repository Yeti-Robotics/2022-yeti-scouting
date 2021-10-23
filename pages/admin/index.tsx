import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { NextPage } from 'next';
import React from 'react';

const Admin: NextPage = () => {
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
			<h1>Admin page</h1>
			<Link href='/admin/forms' passHref>
				<a>Forms</a>
			</Link>
		</Layout>
	);
};

export default Admin;
