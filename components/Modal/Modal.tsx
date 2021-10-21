import { useClickedOutside } from '@/hooks/useClickedOutside';
import React, { useEffect, useState } from 'react';
import { ModalButton, ModalWrapper } from './ModalStyles';

interface ModalProps {
	state: boolean | undefined;
	style?: React.CSSProperties;
	buttonStyle?: React.CSSProperties;
	buttonText?: string;
}

const Modal: React.FC<ModalProps> = ({ state, style, buttonStyle, buttonText, children }) => {
	const [visible, setVisible] = useState(false);
	const value = state;
	const ref = useClickedOutside(undefined, () => {
		setVisible(false);
	});

	useEffect(() => {
		if (!ref.current) return;
		if (visible && value) {
			ref.current.style.top = '150px';
		} else if (!visible) {
			ref.current.style.top = '-500px';
		}
	}, [visible]);

	useEffect(() => {
		if (value) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [value]);

	return (
		<ModalWrapper ref={ref} style={style}>
			{children}
			<ModalButton type='button' onClick={() => setVisible(false)} style={buttonStyle}>
				{buttonText}
			</ModalButton>
		</ModalWrapper>
	);
};

Modal.defaultProps = {
	buttonText: 'Okay',
};

export default Modal;
