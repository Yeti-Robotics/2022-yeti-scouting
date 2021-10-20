import { NextPage } from 'next';
import fetcher from '@/lib/fetch';
import React from 'react';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { TeamData } from '@/models/aggregations/team-data';

const TeamPage: NextPage = (props) => {
	const { data, error } = useSWR<TeamData[]>('/api/team-data', fetcher);

	if (!data) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<h1>There wa an error getting this data.</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<h1></h1>
		</Layout>
	);
};

export default TeamPage;
