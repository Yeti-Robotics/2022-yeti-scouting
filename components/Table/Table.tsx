/* eslint-disable react/jsx-key */
import { useTable, useSortBy } from 'react-table';
import { TableStyles } from './TableStyles';

interface TableProps {
	columns: any[];
	data: any[];
	max?: number;
}

const Table: React.FC<TableProps> = ({ columns, data, max = 20 }) => {
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
								{headerGroup.headers.map((column) => (
									// we can add them into the header props
									// Add the sorting props to control sorting. For this example
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' ▼'
													: ' ▲'
												: ''}
										</span>
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
				<div>
					Showing the first {max} results of {rows.length} rows
				</div>
			</TableStyles>
		</>
	);
};

export default Table;
