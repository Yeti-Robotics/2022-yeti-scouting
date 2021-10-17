import Layout from '@/components/Layout';
import Login from '@/components/Login';
import { NextPage } from 'next';
import React from 'react';

const LoginPage: NextPage = () => {
	return (
		<Layout>
			<Login />
		</Layout>
	);
};

export default LoginPage;
