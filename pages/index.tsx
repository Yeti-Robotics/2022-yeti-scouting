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
			<h1>scouting</h1>
			<div>
				{data.map((team) => (
					<p key={team.teamNumber}>
						{team.teamNumber} {team.team_name}
					</p>
				))}
			</div>
		</Layout>
	);
};

export default Home;
