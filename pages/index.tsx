import Layout from '@/components/Layout';
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

	return (
		<Layout>
			<h1>scouting</h1>
			<p>
				{data
					? data.map((team) => (
							<p key={team.teamNumber}>
								{team.teamNumber} {team.team_name}
							</p>
					  ))
					: error
					? 'error occured'
					: 'loding'}
			</p>
		</Layout>
	);
};

export default Home;
