/* eslint-disable react/jsx-key */
import { mostCommonEndPosString } from '@/lib/mode';
import { useTable, useSortBy } from 'react-table';
import { TableStyles } from './TableStyles';

interface TableProps {
	columns: any[];
	data: any[];
	max?: number;
	showingNumOfTotal?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, max = 20, showingNumOfTotal = false }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy,
	);

	if (data[0] === undefined)
		return (
			<p style={{ fontSize: '2.3rem', fontWeight: 'bold', color: '#000000' }}>
				There is no data for this table.
			</p>
		);

	// We don't want to render all 2000 rows for this example, so cap
	// it at 20 for this use case
	const firstPageRows = rows.slice(0, max);

	return (
		<>
			<TableStyles>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column: any) => (
									// we can add them into the header props
									// Add the sorting props to control sorting. For this example
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										<span>
											{column.isSorted
												? column.isSortedDesc
													? '▼ '
													: '▲ '
												: ''}
										</span>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{firstPageRows.map((row, index) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									style={{
										backgroundColor: index % 2 === 0 ? '#dbdbdb' : '#ffffff',
									}}
								>
									{row.cells.map((cell) => {
										if (cell.column.Header === 'Most Common End Pos') {
											return (
												<td {...cell.getCellProps()}>
													{mostCommonEndPosString(cell.value)}
												</td>
											);
										} else if (cell.column.Header === 'Initiation Line') {
											return (
												<td {...cell.getCellProps()}>
													{cell.value === true
														? '✔️'
														: cell.value === false
														? '❌'
														: typeof cell.value !== 'string'
														? 'no data'
														: null}
												</td>
											);
										} else if (cell.column.Header === 'Name') {
											return (
												<td {...cell.getCellProps()}>
													<a
														style={{
															textDecoration: 'underline',
															color: 'blue',
														}}
														href={`/team/${row.cells[0].value}`}
													>
														{cell.value}
													</a>
												</td>
											);
										} else if (cell.column.Header === 'End Pos') {
											return (
												<td {...cell.getCellProps()}>
													{mostCommonEndPosString([cell.value])}
												</td>
											);
										}
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<br />
				{showingNumOfTotal && (
					<p>
						Showing the first {firstPageRows.length} results of {rows.length} rows
					</p>
				)}
			</TableStyles>
		</>
	);
};

export default Table;
