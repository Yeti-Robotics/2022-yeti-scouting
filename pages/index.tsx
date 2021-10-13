import Layout from '@/components/Layout';
import fetcher from '@/lib/fetch';
import type { NextPage } from 'next';
import React from 'react';
import useSWR from 'swr';

const Home: NextPage = () => {
	const { data, error } = useSWR<any[]>('/api/team-data', fetcher);

	return (
		<Layout>
			<h1>scouting</h1>
			<p>
				{data
					? data.map((team) => <p key={team.team_number}>{team.team_name}</p>)
					: error
					? 'error occured'
					: 'loding'}
			</p>
		</Layout>
	);
};

export default Home;
