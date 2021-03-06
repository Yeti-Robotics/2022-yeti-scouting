import { colors } from '@/styles/colors';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
	position: fixed;
	top: -500px;
	transition: top 0.3s ease;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	padding: 15px;
	margin: 0 5px 0 5px;
	border: 2px solid #000000;
	border-radius: 10px;
	font-size: 1rem;
	z-index: 1;
	background-color: white;
	box-shadow: ${colors.defaultShadow};
`;

export const ModalButton = styled.button`
	margin: 1rem 0 0 0;
	border: 0;
	display: grid;
	place-items: center;
	font-size: 1rem;
	background-color: ${colors.primary};
	padding: 10px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		outline: 4px solid blue;
	}

	&:focus {
		outline: 4px solid blue;
	}
`;
