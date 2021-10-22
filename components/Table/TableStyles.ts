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
		border-radius: 10px;
		flex-grow: 1;
		box-shadow: ${colors.defaultShadow};

		tr {
			:last-child {
				td {
				}
			}
		}

		thead {
			background-color: ${colors.primary};

			tr {
				th {
					border: 1px solid transparent;
					border-right: 1px solid #000000;
					border-bottom: 1px solid #000000;
					:last-child {
						border-top-right-radius: 10px;
					}
					:first-child {
						border-top-left-radius: 10px;
					}
				}
			}
		}

		tbody {
			background-color: ${colors.secondary};

			tr {
				:last-child {
					td {
						border-bottom: 1px solid transparent;
						:last-child {
							border-bottom-right-radius: 10px;
						}
						:first-child {
							border-bottom-left-radius: 10px;
						}
					}
				}
			}
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
