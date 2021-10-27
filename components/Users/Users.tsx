import { User } from '@/hooks/useUser';
import { User as DbUser } from '@/models/user';
import fetcher from '@/lib/fetch';
import { Form, NumForm } from '@/models/form';
import React, { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import Loading from '../Loading';
import Filter from './Filter';
import FormCard from './UserCard';
import { FormsWrapper, ResultsWrapper } from './UsersStyles';

interface FormsProps {
	user: User | undefined;
}

const Users: React.FC<FormsProps> = ({ user }) => {
	const [query, setQuery] = useState({});
	const { data: currData } = useSWR<DbUser[]>(
		`/api/admin/users?${new URLSearchParams(query).toString()}`,
		fetcher,
	);
	const [fallbackData, setFallbackData] = useState(currData);
	const [sort, setSort] = useState<{
		by: 'teamNumber';
		from: 1 | -1;
	}>({
		by: 'teamNumber',
		from: 1,
	});
	const compare = useCallback(
		(a: DbUser, b: DbUser) => {
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
					{data.slice(0, 100).map((user) => (
						<FormCard key={user.username} user={user} />
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

export default Users;
