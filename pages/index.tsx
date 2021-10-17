import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import fetcher from '@/lib/fetch';
import { TeamData } from '@/models/aggregations/team-data';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const Home: NextPage = () => {
	const { data, error } = useSWR<TeamData[]>('/api/team-data', fetcher);
	const router = useRouter();

	if (error) router.push('/login');
	if (!data)
		return (
			<Layout>
				<Loading />
			</Layout>
		);

	return (
		<Layout>
			<h1>scouting (PH)</h1>
			<div>
				{data.map((team) => (
					<p key={team.teamNumber}>
						#: {team.teamNumber} name: {team.team_name} avg upper auto:{' '}
						{team.avgUpperAuto} position control: {team.positionControl}
					</p>
				))}
			</div>
		</Layout>
	);
};

export default Home;
