import { useClickedOutside } from '@/hooks/useClickedOutside';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from './ScoutingFormStyles';

interface StatusModalProps {
	submitted: { message: string; id?: string; error: boolean } | undefined;
	setSubmitted: React.Dispatch<
		React.SetStateAction<{ message: string; id?: string; error: boolean } | undefined>
	>;
}

const StatusModal: React.FC<StatusModalProps> = ({ submitted }) => {
	const ref = useClickedOutside<HTMLDivElement>(undefined, () => {
		if (!ref.current) return;
		ref.current.style.top = '-400px';
		setUndoText('');
	});
	const timeout = useRef(setTimeout(() => {}));
	const [undoText, setUndoText] = useState('');
	const [error, setError] = useState<boolean>();

	useEffect(() => {
		if (!ref.current) return;
		if (!submitted) {
			ref.current.style.top = '-400px';
			setUndoText('');
		} else {
			ref.current.style.top = '120px';
		}
	}, [submitted]);

	const onUndo = () => {
		fetch('/api/delete-form', { method: 'DELETE', body: JSON.stringify(submitted?.id) })
			.then((res) => res.json())
			.then((json) => {
				if (json.error) {
					setUndoText('There was an error deleting the form.');
					setError(true);
				} else {
					setUndoText('Form successfully deleted.');
					setError(false);
				}
				timeout.current = setTimeout(() => {
					if (!ref.current) return;
					ref.current.style.top = '-400px';
					setUndoText('');
					setError(false);
				}, 3000);
			});
	};

	return (
		<>
			<Modal
				ref={ref}
				onClick={
					error ? () => (ref.current ? (ref.current.style.top = '-400px') : '') : onUndo
				}
				style={{ backgroundColor: error ? 'red' : 'green' }}
				onSubmit={() => {
					if (!timeout.current) return;
					clearTimeout(timeout.current);
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='36'
					height='36'
					fill='#ffffff'
					viewBox='0 0 24 24'
				>
					{error ? (
						<path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
					) : (
						<path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
					)}
				</svg>
				<h1 style={{ fontSize: '1rem' }}>
					{error
						? undoText
							? undoText
							: "There was an error submitting your form, make sure you're logged in"
						: undoText
						? undoText
						: 'Form submitted successfully, click this modal to undo submission.'}
				</h1>
			</Modal>
		</>
	);
};

export default StatusModal;
