import styled from 'styled-components';

export const IcicleStyle = styled.div`
	width: 15px;
	height: 40px;
	border: 0;
	background: transparent
		linear-gradient(0deg, rgba(205, 252, 255, 1) 0%, rgba(84, 182, 229, 1) 78%);
	clip-path: polygon(0 0, 50% 100%, 100% 0);
	transform: rotate(360deg);
	-webkit-transform: rotate(360deg);
`;

export const IcicleWrapper = styled.div`
	display: flex;
	position: absolute;
	width: 100%;
	top: 100%;
	left: 0;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-around;
	z-index: 0;
`;
