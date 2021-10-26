import Form from '@/components/Forms/Form';
import Layout from '@/components/Layout';
import useUser from '@/hooks/useUser';
import { NextPage } from 'next';
import React from 'react';

const FormPage: NextPage = () => {
	const { user } = useUser({ redirectTo: '/login' });

	return (
		<Layout>
			<Form user={user} />
		</Layout>
	);
};

export default FormPage;
