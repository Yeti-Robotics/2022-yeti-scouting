import { NextPage } from 'next';
import fetcher from '@/lib/fetch';
import React, { useMemo } from 'react';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { TeamData } from '@/models/aggregations/team-data';
import { useRouter } from 'next/router';
import { Form } from '@/models/form';
import Title from '@/components/Title';
import { Section } from '@/components/ScoutingForm/ScoutingFormStyles';
import Table from '@/components/Table';
import { mostCommonEndPosString } from '@/lib/mode';

const TeamPage: NextPage = () => {
	const router = useRouter();
	const { data, error } = useSWR<{ team: TeamData; forms: Form[] }>(
		`/api/team-data/${router.isReady ? router.query.number : ''}`,
		fetcher,
	);

	const autoTableHeaders = useMemo(
		() => [
			{
				Header: 'Match #',
				accessor: 'match_number',
			},
			{
				Header: 'Preloaded Balls',
				accessor: 'preload',
			},
			{
				Header: 'Initiation Line',
				accessor: 'cross_initiation_line',
			},
			{
				Header: 'Upper Scored',
				accessor: 'auto_upper_scored_balls',
			},
			{
				Header: 'Upper Missed',
				accessor: 'auto_upper_missed_balls',
			},
			{
				Header: 'Lower Scored',
				accessor: 'auto_low_scored_balls',
			},
			{
				Header: 'Lower Missed',
				accessor: 'auto_low_missed_balls',
			},
			{
				Header: 'End Pos',
				accessor: 'end_position',
			},
		],
		[],
	);

	const teleopTableHeaders = useMemo(
		() => [
			{
				Header: 'Match #',
				accessor: 'match_number',
			},
			{
				Header: 'Preloaded Balls',
				accessor: 'preload',
			},
			{
				Header: 'Initiation Line',
				accessor: 'cross_initiation_line',
			},
			{
				Header: 'Upper Scored',
				accessor: 'teleop_upper_scored_balls',
			},
			{
				Header: 'Upper Missed',
				accessor: 'teleop_upper_missed_balls',
			},
			{
				Header: 'Lower Scored',
				accessor: 'teleop_low_scored_balls',
			},
			{
				Header: 'Lower Missed',
				accessor: 'teleop_low_missed_balls',
			},
			{
				Header: 'End Pos',
				accessor: 'end_position',
			},
		],
		[],
	);

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
				<h1>There was an error getting this data.</h1>
			</Layout>
		);
	}

	if (typeof data.forms[0] === 'undefined' && typeof data.team === 'undefined') {
		return (
			<Layout>
				<h1>There is no data for team {router.query.number}.</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<Title>
				Team {data.team.teamNumber}, {data.team.team_name}
			</Title>
			<Section style={{ paddingBottom: 0 }}>
				<h1>Team Stats</h1>
				<h2>Initiation Line: {data.team.initiationLine}</h2>
				<h2>Avg Upper Auto: {data.team.avgUpperAuto}</h2>
				<h2>Avg Lower Auto: {data.team.avgLowerAuto}</h2>
				<h2>Avg Auto Score: {data.team.avgAutoScore}</h2>
				<h2>Avg Upper Teleop: {data.team.avgUpperTeleop}</h2>
				<h2>Avg Lower Teleop: {data.team.avgLowerTeleop}</h2>
				<h2>Avg Teleop Score: {data.team.avgTeleopScore}</h2>
				<h2>Most Common End Position: {mostCommonEndPosString(data.team.endPosition)}</h2>
			</Section>
			<Section style={{ paddingBottom: 0 }}>
				<h1>Auto Match Data</h1>
				<Table columns={autoTableHeaders} data={data.forms} max={50} />
			</Section>
			<Section style={{ paddingBottom: 0 }}>
				<h1>Teleop Match Data</h1>
				<Table columns={teleopTableHeaders} data={data.forms} max={50} />
			</Section>
			<Section style={{ paddingBottom: 0 }}>
				<h1>Comments</h1>
				{data.forms.map((form, index) => {
					if (index === data.forms.length - 1) {
						return (
							<div style={{ padding: '1rem', border: 0 }} key={index}>
								<h2 style={{ border: 0 }}>{form.comment}</h2>
								<p style={{ margin: 0 }}>- {form.scouter}</p>
							</div>
						);
					}

					return (
						<div
							style={{
								padding: '1rem',
								borderBottom: '2px solid #000000',
								width: 'auto',
							}}
							key={index}
						>
							<h2 style={{ border: 0 }}>{form.comment}</h2>
							<p style={{ margin: 0 }}>- {form.scouter}</p>
						</div>
					);
				})}
			</Section>
		</Layout>
	);
};

export default TeamPage;
