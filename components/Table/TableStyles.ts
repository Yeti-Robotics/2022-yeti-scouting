import { colors } from '@/styles/colors';
import styled from 'styled-components';

export const TableStyles = styled.div`
	padding: 1rem;
	width: 100%;
	flex-flow: row wrap;
	display: flex;
	overflow-x: auto;

	p {
		width: 100%;
	}

	table {
		border-spacing: 0;
		border: 1px solid black;
		flex-grow: 1;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		thead {
			background-color: ${colors.primary};
		}

		tbody {
			background-color: ${colors.secondary};
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;

			:last-child {
				border-right: 0;
			}
		}
	}
`;
