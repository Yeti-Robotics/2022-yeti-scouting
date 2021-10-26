import { Form } from '@/models/form';
import React from 'react';
import { FormCardWrapper } from './FormsStyles';
import Link from 'next/link';

interface FormCardProps {
	form: Form;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
	return (
		<Link href={`/admin/forms/${form._id}`} passHref>
			<FormCardWrapper>
				<h2>Match #: {form.match_number}</h2>
				<h3>Team #: {form.team_number}</h3>
				<h4>Auto Upper Scored: {form.auto_upper_scored_balls}</h4>
				<h4>Auto Lower Scored: {form.auto_low_scored_balls}</h4>
				<h4>Teleop Upper Scored: {form.teleop_upper_scored_balls}</h4>
				<h4>Teleop Lower Scored: {form.teleop_low_scored_balls}</h4>
				<p>Scouter: {form.scouter}</p>
			</FormCardWrapper>
		</Link>
	);
};

export default FormCard;
