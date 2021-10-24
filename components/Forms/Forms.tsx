import { User } from '@/hooks/useUser';
import fetcher from '@/lib/fetch';
import { Form } from '@/models/form';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import Loading from '../Loading';
import Filter from './Filter';
import { FormsWrapper } from './FormsStyles';

interface FormsProps {
	user: User | undefined;
}

const Forms: React.FC<FormsProps> = ({ user }) => {
	const [query, setQuery] = useState({});
	const { data: currData } = useSWR<Form[]>(
		`/api/admin/forms?${new URLSearchParams(query).toString()}`,
		fetcher,
	);
	const [fallbackData, setFallbackData] = useState(currData);
	const data = useMemo(() => {
		if (currData) {
			user?.mutate();
			setFallbackData(currData);
			return currData;
		} else {
			return fallbackData;
		}
	}, [currData]);

	if (!currData && !fallbackData) {
		return (
			<FormsWrapper>
				<Loading />
			</FormsWrapper>
		);
	}

	return (
		<FormsWrapper>
			<Filter setQuery={setQuery} />
			{user?.isLoggedIn ? (
				<pre>{JSON.stringify(data, null, 4)}</pre>
			) : (
				<h1>You must be logged in to view this page.</h1>
			)}
		</FormsWrapper>
	);
};

export default Forms;
