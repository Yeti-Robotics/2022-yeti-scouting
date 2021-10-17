import Router from 'next/router';
import { useEffect, useState } from 'react';

interface User {
	username: string;
	firstName: string;
	lastName: string;
	teamNumber: number;
	administator: boolean;
	isLoggedIn: true;
}

const useUser = ({ redirectTo = '/login', redirectIfFound = false } = {}) => {
	const [user, setUser] = useState<User>();
	const mutateUser = async () => {
		const res = await fetch('/api/is-authenticated');
		const json = await res.json();
		setUser(json);
	};

	useEffect(() => {
		fetch('/api/is-authenticated').then(async (res) => {
			const json = await res.json();
			setUser(json);
		});
	}, []);

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
