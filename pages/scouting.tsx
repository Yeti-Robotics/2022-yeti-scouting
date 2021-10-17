import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ScoutingForm from '@/components/ScoutingForm';
import useUser from '@/hooks/useUser';
import { NextPage } from 'next';
import React from 'react';

const StandScouting: NextPage = () => {
	const { user } = useUser({ redirectTo: '/login' });

	if (!user || !user.isLoggedIn) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout>
			<pre>{JSON.stringify(user, null, 4)}</pre>
			<ScoutingForm scouter={`${user.firstName} ${user.lastName}(${user.username})`} />
		</Layout>
	);
};

export default StandScouting;
