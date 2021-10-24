import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import fetcher from '@/lib/fetch';
import { Form } from '@/models/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const FormPage: NextPage = () => {
	const router = useRouter();
	const { data, error } = useSWR<Form>(
		`/api/admin/form/${router.isReady ? router.query.id : ''}`,
		fetcher,
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

	if (!data._id) {
		return (
			<Layout>
				<h1>No form exists with this id.</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</Layout>
	);
};

export default FormPage;
