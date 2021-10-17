import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import useUser from '@/hooks/useUser';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Logout: NextPage = () => {
	const { user } = useUser({ redirectTo: '/login' });
	const router = useRouter();

	if (!user || !user?.isLoggedIn)
		return (
			<Layout>
				<Loading />
			</Layout>
		);

	if (user.isLoggedIn)
		fetch('/api/user/logout').then(async (res) => {
			if (res.status === 200) {
				router.push('/');
			} else {
				router.push('/login');
			}
		});

	return <Layout></Layout>;
};

export default Logout;
