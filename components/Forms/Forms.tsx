import fetcher from '@/lib/fetch';
import { Form } from '@/models/form';
import { useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import useSWR from 'swr';
import Loading from '../Loading';
import Filter from './Filter';
import { FormsWrapper } from './FormsStyles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
	team_number: Yup.number()
		.min(1, 'Must be above 0')
		.max(9999, 'Must be below 10000')
		.typeError('Must be a number'),
	match_number: Yup.number()
		.min(0, 'Must be above -1')
		.max(9999, 'Must be below 10000')
		.typeError('Must be a number'),
	preload: Yup.number()
		.min(0, 'Must be above -1')
		.max(3, 'Must be be below 4')
		.typeError('Must be a number'),
	cross_initiation_line: Yup.bool(),
	auto_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	auto_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	auto_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	auto_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	spill_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(2, 'Must be below 3')
		.typeError('Must be a number'),
	teleop_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	teleop_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	teleop_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	teleop_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.typeError('Must be a number'),
	defense: Yup.number()
		.min(0, 'Must be above -1')
		.max(4, 'Must be below 5')
		.typeError('Must be a number'),
});

const Forms: React.FC = () => {
	const { data } = useSWR<Form[]>('/api/admin/forms', fetcher);
	const query = useRef<{ [key: string]: any }>({});

	const { register } = useForm<Omit<Form, 'comment'>>({
		resolver: yupResolver(schema),
	});

	if (!data) {
		return (
			<FormsWrapper>
				<Loading />
			</FormsWrapper>
		);
	}

	return (
		<FormsWrapper>
			<form>
				<Filter />
			</form>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</FormsWrapper>
	);
};

export default Forms;
