import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Table from '@/components/Table';
import fetcher from '@/lib/fetch';
import { TeamData } from '@/models/aggregations/team-data';
import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import useSWR from 'swr';

const Home: NextPage = () => {
	const { data } = useSWR<TeamData[]>('/api/team-data', fetcher);

	const tableColumns = useMemo(
		() => [
			{
				Header: '#',
				accessor: 'teamNumber',
			},
			{
				Header: 'Name',
				accessor: 'team_name',
			},
			{
				Header: 'Avg Upper Auto',
				accessor: 'avgUpperAuto',
			},
			{
				Header: 'Avg Lower Auto',
				accessor: 'avgLowerAuto',
			},
			{
				Header: 'Avg Upper Teleop',
				accessor: 'avgUpperTeleop',
			},
			{
				Header: 'Avg Lower Teleop',
				accessor: 'avgLowerTeleop',
			},
		],
		[],
	);

	if (!data)
		return (
			<Layout>
				<Loading />
			</Layout>
		);

	return (
		<Layout style={{ overflowY: 'auto' }}>
			<h1>scouting (PH)</h1>
			<Table columns={tableColumns} data={data} max={99} />
		</Layout>
	);
};

export default Home;
