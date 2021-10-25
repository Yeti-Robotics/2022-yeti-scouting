import { User } from '@/hooks/useUser';
import fetcher from '@/lib/fetch';
import { Form, NumForm } from '@/models/form';
import React, { useCallback, useMemo, useState } from 'react';
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
	const [sort, setSort] = useState<{
		by: keyof NumForm;
		from: 1 | -1;
	}>({
		by: 'match_number',
		from: -1,
	});
	const compare = useCallback(
		(a: Form, b: Form) => {
			if (sort.from === 1) {
				return b[sort.by] - a[sort.by];
			} else {
				return a[sort.by] - b[sort.by];
			}
		},
		[sort],
	);
	const data = useMemo(() => {
		if (currData) {
			user?.mutate();
			setFallbackData(currData);
			return [...currData].sort(compare);
		} else {
			return fallbackData ? [...fallbackData].sort(compare) : [];
		}
	}, [currData, sort]);

	if (!currData && !fallbackData) {
		return <Loading />;
	}

	return (
		<FormsWrapper>
			<Filter setQuery={setQuery} setSort={setSort} />
			{data !== undefined && data[0] !== undefined ? (
				<ResultsWrapper>
					{data.slice(0, 100).map((form) => (
						<FormCard key={form._id} form={form} />
					))}
					<p>
						Showing {data.length} of {currData?.length} forms
					</p>
				</ResultsWrapper>
			) : (
				<h1>No forms match this criteria.</h1>
			)}
		</FormsWrapper>
	);
};

export default Forms;
