import { colors } from '@/styles/colors';
import styled from 'styled-components';

export const Section = styled.div`
	margin: 20px;
	padding: 0 0 10px 0;
	background-color: ${colors.secondary};
	border: 2px solid #000000;
	border-radius: 10px;
	width: 95%;
	box-shadow: ${colors.defaultShadow};

	h1 {
		margin: 0;
		padding: 20px 10px 20px 10px;
		background-color: #eaeaea;
		border-bottom: 2px solid #000000;
		border-radius: 10px 10px 0 0;
	}
`;

export const Field = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 25px 0 0 0;

	label {
		font-size: 2rem;
		align-self: flex-start;
		margin: 0 0 15px 5%;
		width: 95%;
	}

	textarea {
		width: 90%;
		height: 30vh;
	}

	select {
		display: table-row;
		font-size: 2rem;
		height: 4rem;
		overflow-y: hidden;

		option {
			display: table-cell;
			padding: 12.5px 4vw 12.5px 4vw;
		}
	}
`;

export const Input = styled.input`
	width: 90%;
	padding: 10px;
`;

export const HoriSelect = styled.select`
	display: table-row;
	font-size: 9vw;
	height: 4rem;
	overflow-y: hidden;
	border: 2px solid #000000;
	border-radius: 10px;
	cursor: pointer;

	option {
		display: table-cell;
		padding: 12.5px 4vw 12.5px 4vw;
	}
`;

export const Checkbox = styled.input`
	width: 100px;
	height: 100px;
	border: 5px dotted #000000;
	cursor: pointer;
`;
