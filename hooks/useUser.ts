import fetcher from '@/lib/fetch';
import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const useUser = ({ redirectTo = '/login', redirectIfFound = false } = {}) => {
	const { data: user, mutate: mutateUser } = useSWR<{
		username: string;
		firstName: string;
		lastName: string;
		teamNumber: number;
		administator: boolean;
		isLoggedIn: true;
	}>('/api/is-authenticated', fetcher);

	useEffect(() => {
		if (!redirectTo || !user) return;

		if (
			(redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
			(redirectIfFound && user?.isLoggedIn)
		) {
			Router.push(`${redirectTo}?from=${Router.pathname}`);
		}
	}, [user, redirectTo, redirectIfFound]);

	return { user, mutateUser };
};

export default useUser;
