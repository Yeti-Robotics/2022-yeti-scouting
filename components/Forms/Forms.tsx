import { User } from '@/hooks/useUser';
import fetcher from '@/lib/fetch';
import { Form } from '@/models/form';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import Loading from '../Loading';
import Filter from './Filter';
import FormCard from './FormCard';
import { FormsWrapper, ResultsWrapper } from './FormsStyles';

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
		return <Loading />;
	}

	return (
		<FormsWrapper>
			<Filter setQuery={setQuery} />
			{data !== undefined && data[0] !== undefined ? (
				<ResultsWrapper>
					{data.map((form) => (
						<FormCard key={form._id} form={form} />
					))}
				</ResultsWrapper>
			) : (
				<h1>No forms match this criteria.</h1>
			)}
		</FormsWrapper>
	);
};

export default Forms;
