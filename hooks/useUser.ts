import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export interface User {
	username: string;
	firstName: string;
	lastName: string;
	teamNumber: number;
	administrator: boolean;
	isLoggedIn: true;
	mutate: () => void;
}

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
	const [user, setUser] = useState<User>();
	const mutateUser = async () => {
		const res = await fetch('/api/is-authenticated');
		const json = await res.json();
		setUser({ ...json, mutate: mutateUser });
	};
	const getUser = useCallback(async () => {
		fetch('/api/is-authenticated').then(async (res) => {
			const json = await res.json();
			setUser({ ...json, mutate: mutateUser });
		});
	}, []);

	useEffect(() => {
		getUser();
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

	return { user };
};

export default useUser;
