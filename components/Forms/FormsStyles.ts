import { colors } from '@/styles/colors';
import styled from 'styled-components';

export const FormsWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	width: 100%;
`;

export const ResultsWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	flex-flow: column;
	align-items: center;
`;

// Filter
export const FilterWrapper = styled.div`
	min-width: 300px;
`;

export const FilterForm = styled.form`
	width: 100%;
`;

export const Field = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	margin: 0 0 1rem 0;

	input {
		border: 2px solid #000000;
		border-radius: 10px;
		padding: 5px;
		width: 100px;

		&:focus {
			outline: 2px solid blue;
		}
	}

	label {
		font-size: 1rem;
	}
`;

export const Submit = styled.button`
	border-radius: 10px;
	font-size: 1rem;
	font-weight: bold;
	background-color: ${colors.primary};
	color: ${colors.secondary};
	width: 50%;
	padding: 0.5rem 0 0.5rem 0;
	cursor: pointer;
`;

// FormCard
export const FormCardWrapper = styled.a`
	display: flex;
	flex-flow: column;
	border: 2px solid #000000;
	border-radius: 10px;
	box-shadow: ${colors.defaultShadow};
	width: 100%;
	margin: 1rem;
	padding: 10px;

	h2,
	h3,
	h4 {
		margin-bottom: 0;
	}
`;
