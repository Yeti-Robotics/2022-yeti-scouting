import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface User {
	username: string;
	firstName: string;
	lastName: string;
	teamNumber: number;
	administator: boolean;
	isLoggedIn: true;
}

const useUser = ({ redirectTo = '', redirectIfFound = false, redirectIfNotAdmin = false } = {}) => {
	const [user, setUser] = useState<User>();
	const getUser = useCallback(async () => {
		fetch('/api/is-authenticated').then(async (res) => {
			const json = await res.json();
			setUser(json);
		});
	}, []);
	const mutateUser = async () => {
		const res = await fetch('/api/is-authenticated');
		const json = await res.json();
		setUser(json);
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (!redirectTo || !user) return;

		if (
			(redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
			(redirectIfFound && user?.isLoggedIn) ||
			(redirectIfNotAdmin && user?.isLoggedIn && !user?.administator)
		) {
			Router.push(`${redirectTo}?from=${Router.pathname}`);
		}
	}, [user, redirectTo, redirectIfFound]);

	return { user, mutateUser };
};

export default useUser;
