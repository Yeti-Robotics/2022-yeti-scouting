/* eslint-disable react/jsx-key */
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
						{firstPageRows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										if (cell.column.Header === 'Most Common End Pos') {
											return (
												<td {...cell.getCellProps()}>
													{cell.value === 0
														? 'Nothing'
														: cell.value === 1
														? 'Parked'
														: cell.value === 2
														? 'Got Lifted'
														: cell.value === 3
														? 'Lifted Teammate'
														: cell.value === 4
														? 'Solo, not balanced'
														: cell.value === 5
														? 'Solo, balanced'
														: 'no data'}
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
