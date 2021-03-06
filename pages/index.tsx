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
				Header: 'Initiation Line',
				accessor: 'initiationLine',
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
				Header: 'Avg Auto Score',
				accessor: 'avgAutoScore',
			},
			{
				Header: 'Avg Upper Teleop',
				accessor: 'avgUpperTeleop',
			},
			{
				Header: 'Avg Lower Teleop',
				accessor: 'avgLowerTeleop',
			},
			{
				Header: 'Avg Teleop Score',
				accessor: 'avgTeleopScore',
			},
			{
				Header: 'Most Common End Pos',
				accessor: 'endPosition',
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
		<Layout style={{ overflowX: 'auto' }}>
			<h1>Scouting</h1>
			<Table columns={tableColumns} data={data} max={99} />
		</Layout>
	);
};

export default Home;
