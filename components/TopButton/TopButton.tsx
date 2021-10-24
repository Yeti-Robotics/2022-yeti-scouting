import { colors } from '@/styles/colors';
import React from 'react';

interface TopButtonProps {
	text: string;
	style?: React.CSSProperties;
}

const TopButton: React.FC<TopButtonProps> = ({ text, style }) => {
	return (
		<button
			type='button'
			style={
				style || {
					position: 'fixed',
					bottom: 16,
					right: 16,
					borderRadius: 20,
					fontSize: '2rem',
					padding: '5px',
					color: colors.secondary,
					backgroundColor: colors.primary,
					cursor: 'pointer',
				}
			}
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			{text}
		</button>
	);
};

export default TopButton;
