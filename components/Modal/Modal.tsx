import { useClickedOutside } from '@/hooks/useClickedOutside';
import React, { useEffect } from 'react';
import { ModalButton, ModalWrapper } from './ModalStyles';

interface ModalProps {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	style?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	buttonStyle?: React.CSSProperties;
	buttonText?: string;
}

const Modal: React.FC<ModalProps> = ({
	state,
	style,
	innerStyle,
	buttonStyle,
	buttonText,
	children,
}) => {
	const [visible, setVisible] = state;
	const ref = useClickedOutside(undefined, () => {
		setVisible(false);
	});

	useEffect(() => {
		if (!ref.current) return;
		if (visible) {
			ref.current.style.top = '120px';
		} else {
			ref.current.style.top = '-500px';
		}
	}, [visible]);

	return (
		<ModalWrapper ref={ref} style={style}>
			<div style={innerStyle}>
				{children}
				<ModalButton type='button' style={buttonStyle}>
					{buttonText}
				</ModalButton>
			</div>
		</ModalWrapper>
	);
};

Modal.defaultProps = {
	buttonText: 'Okay',
};

export default Modal;
