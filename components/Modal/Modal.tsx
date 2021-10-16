import { useClickedOutside } from '@/hooks/useClickedOutside';
import React, { useEffect } from 'react';
import { ModalButton, ModalWrapper } from './ModalStyles';

interface ModalProps {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	style?: React.CSSProperties;
	buttonStyle?: React.CSSProperties;
	buttonText?: string;
}

const Modal: React.FC<ModalProps> = ({ state, style, buttonStyle, buttonText, children }) => {
	const [visible, setVisible] = state;
	const ref = useClickedOutside(undefined, () => {
		setVisible(false);
	});

	useEffect(() => {
		if (!ref.current) return;
		if (visible) {
			ref.current.style.top = '150px';
		} else {
			ref.current.style.top = '-500px';
		}
	}, [visible]);

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
