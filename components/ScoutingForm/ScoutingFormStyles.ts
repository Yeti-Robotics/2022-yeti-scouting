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
		background: #eaeaea;
		border-bottom: 2px solid #000000;
		border-radius: 10px 10px 0 0;
	}

	h2 {
		margin: 0;
		padding: 1rem;
		border-bottom: 2px solid #000000;

		:last-child {
			border: 0;
		}
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
		font-size: 1.5rem;
		width: 95%;
	}

	textarea {
		width: 90%;
		height: 30vh;
		font-size: 1rem;
		font-family: ${colors.fonts};
	}
`;

export const Input = styled.input`
	width: 90%;
	padding: 15px;
	border: 2px solid #000000;
	border-radius: 10px;
	font-size: 1rem;
	transition: border-color 0.3s ease, background-color 0.3s ease;
	margin: 15px 0 0 0;

	&:hover {
		border-color: blue;
	}

	&:focus {
		outline: 4px solid lightblue;
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
	background: ${colors.primary};
	cursor: pointer;
	appearance: none;

	&:focus {
		outline: none;
	}
`;

export const Register = styled.button`
	margin-top: 1rem;
	width: 100%;
	padding: 15px;
	border-radius: 10px;
	font-size: 2rem;
	font-weight: bold;
	box-shadow: ${colors.defaultShadow};
	background: rgb(0, 0, 0);
	background: ${colors.primary};
	cursor: pointer;

	&:focus {
		outline: none;
	}
`;

export const Select = styled.select`
	width: 90%;
	border-radius: 10px;
	height: 40px;
	cursor: pointer;
	font-size: 1.2rem;

	&:focus {
		outline: 4px solid lightblue !important;
	}
`;

export const HoriSelect = styled.select`
	margin: 25px 0 0 0;
	font-size: 1rem;
	overflow-y: hidden;
	cursor: pointer;
	border: 2px solid #000000;
	border-radius: 10px;
	width: auto;

	@media only screen and (min-width: 400px) {
		display: table-row;
		font-size: 3vw;
		height: calc(3vw + 35px);
		appearance: none;

		option {
			display: table-cell;
			padding: 12.5px 3vw 12.5px 3vw;
			border-right: 2px solid #000000;
		}
	}

	option {
		padding: 1rem;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${colors.primary};
		}
	}
`;

export const ScoreInputStyles = styled.div`
	position: relative;
	margin: 25px 40px 0 40px;
	width: 55%;
	height: 40px;

	button {
		display: grid;
		place-items: center;
		height: 100%;
		width: 40px;
		font-size: 0.8rem;
		font-weight: bold;
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
		font-size: 1rem;
		border-radius: 0;
		border-right: 0;
		border-left: 0;
	}
`;

export const Checkbox = styled.input`
	width: 40px;
	height: 40px;
	border: 5px dotted #000000;
	cursor: pointer;
`;

export const Modal = styled.div`
	position: fixed;
	top: -400px;
	transition: top 0.3s ease;
	display: flex;
	align-items: center;
	padding: 15px;
	margin: 0 5px 0 5px;
	border: 2px solid #000000;
	border-radius: 10px;
	z-index: 1;
	cursor: pointer;

	svg {
		margin: 0 30px 0 0;
	}
`;

export const Invalid = styled.p`
	color: red;
	font-size: 0.8rem;
`;
