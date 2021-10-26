import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import { ModalButton } from '@/components/Modal/ModalStyles';
import { User } from '@/hooks/useUser';
import fetcher from '@/lib/fetch';
import { Form as FormType } from '@/models/form';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import EditForm from './EditForm';
import { FormWrapper } from './FormStyles';

interface FormProps {
	user: User | undefined;
}

const Form: React.FC<FormProps> = () => {
	const router = useRouter();
	const { data, error } = useSWR<FormType>(
		`/api/admin/form/${router.isReady ? router.query.id : ''}`,
		fetcher,
	);
	const [deleteWarn, setDeleteWarn] = useState(false);

	if (!data) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<h1>There was an error getting this data.</h1>
			</Layout>
		);
	}

	if (!data._id) {
		return (
			<Layout>
				<h1>No form exists with this id.</h1>
			</Layout>
		);
	}

	return (
		<>
			<Modal
				state={deleteWarn}
				outsideClick={(setVisible) => {
					setVisible(false);
					setDeleteWarn(false);
				}}
				onButtonClick={(setVisible) => {
					setVisible(false);
					setDeleteWarn(false);
				}}
				buttonText='Go Back!'
			>
				Are you sure you want to delete this form?
				<ModalButton
					onClick={() => {
						fetch('/api/delete-form', {
							method: 'DELETE',
							body: JSON.stringify(data._id),
						}).then((res) => {
							if (res.status === 200) {
								router.push('/admin/forms');
							} else {
								setDeleteWarn(false);
							}
						});
					}}
				>
					Yes, delete this permanently
				</ModalButton>
			</Modal>
			<button
				onClick={() => setDeleteWarn(true)}
				role='alert'
				style={{
					position: 'fixed',
					top: 100,
					right: 16,
					backgroundColor: 'red',
					padding: 8,
					cursor: 'pointer',
					border: '4px solid #000000',
					borderRadius: 5,
					zIndex: 2,
				}}
			>
				<svg
					width='24'
					height='24'
					xmlns='http://www.w3.org/2000/svg'
					fill='#ffffff'
					fillRule='evenodd'
					clipRule='evenodd'
				>
					<path d='M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z' />
				</svg>
			</button>
			<FormWrapper>
				<EditForm form={data} />
			</FormWrapper>
		</>
	);
};

export default Form;
