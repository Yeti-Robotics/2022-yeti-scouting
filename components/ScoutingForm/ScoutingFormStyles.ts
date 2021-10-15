import { colors } from '@/styles/colors';
import styled from 'styled-components';

export const Section = styled.div`
	margin: 20px;
	padding: 0 0 25px 0;
	background-color: ${colors.secondary};
	border: 2px solid #000000;
	border-radius: 10px;
	width: 95%;
	box-shadow: ${colors.defaultShadow};

	h1 {
		margin: 0;
		padding: 20px 10px 20px 10px;
		background: rgb(0, 0, 0);
		background: linear-gradient(
			360deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(78, 78, 78, 1) 0%,
			rgba(94, 94, 94, 1) 14%,
			rgba(234, 234, 234, 1) 100%
		);
		border-bottom: 4px solid #000000;
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
		width: 95%;
	}

	textarea {
		width: 90%;
		height: 30vh;
		font-size: 1rem;
	}
`;

export const Input = styled.input`
	width: 90%;
	padding: 15px;
	border: 2px solid #000000;
	border-radius: 10px;
	font-size: 1.5rem;
	transition: border-color 0.3s ease, background-color 0.3s ease;

	&:hover {
		border-color: blue;
	}

	&:focus {
		outline: none;
		border-color: blue;
	}
`;

export const Submit = styled.input`
	width: 95%;
	padding: 15px;
	border-radius: 10px;
	font-size: 2rem;
	font-weight: bold;
	box-shadow: ${colors.defaultShadow};
	background: rgb(0, 0, 0);
	background: linear-gradient(
		360deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(78, 78, 78, 1) 0%,
		rgba(94, 94, 94, 1) 14%,
		rgba(234, 234, 234, 1) 100%
	);

	&:focus {
		outline: none;
	}
`;

export const Select = styled.select`
	width: 90%;
	border-radius: 10px;
	height: 60px;
	cursor: pointer;

	&:focus {
		outline: 4px solid ${colors.primary} !important;
	}
`;

export const HoriSelect = styled.select`
	margin: 25px 0 0 0 !important;
	font-size: 1rem !important;
	overflow-y: hidden !important;
	cursor: pointer !important;
	border: 2px solid #000000 !important;
	border-radius: 10px !important;
	width: auto !important;

	@media only screen and (min-width: 400px) {
		display: table-row !important;
		font-size: 3vw !important;
		height: calc(3vw + 35px) !important;
		appearance: none !important;

		option {
			display: table-cell !important;
			padding: 12.5px 3vw 12.5px 3vw !important;
			border-right: 2px solid #000000 !important;
		}
	}

	option {
		padding: 1rem !important;
		transition: background-color 0.3s ease !important;

		&:hover {
			background-color: ${colors.primary} !important;
		}
	}
`;

export const ScoreInputStyles = styled.div`
	position: relative;
	margin: 25px 40px 0 40px;
	width: 55%;

	button {
		display: grid;
		place-items: center;
		height: 100%;
		width: 60px;
		font-size: 2rem;
		margin: 0;
		padding: 15px;
		border: 0;
		top: 0;
		border-radius: 0 3px 3px 0;
		position: absolute;
		background-color: ${colors.primary};
		transition: background-color 0.3s ease;
		cursor: pointer;
		touch-action: manipulation;

		&:focus {
			outline: 4px solid lightblue;
			background-color: ${colors.secondaryPrimay};
		}

		&:hover {
			outline: 4px solid lightblue;
			background-color: ${colors.secondaryPrimay};
		}
	}

	input {
		width: 100%;
		height: 100%;
		padding: 15px;
		font-size: 1.5rem;
		border-radius: 0;
		border-right: 0;
		border-left: 0;
	}
`;

export const Checkbox = styled.input`
	width: 100px;
	height: 100px;
	border: 5px dotted #000000;
	cursor: pointer;
`;
