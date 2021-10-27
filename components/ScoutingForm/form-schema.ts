import * as Yup from 'yup';

const formSchema = Yup.object().shape({
	team_number: Yup.number()
		.min(1, 'Must be above 0')
		.max(9999, 'Must be below 10000')
		.required('This field is required')
		.typeError('Must be a number'),
	match_number: Yup.number()
		.min(0, 'Must be above -1')
		.max(9999, 'Must be below 10000')
		.required('This field is required')
		.typeError('Must be a number'),
	preload: Yup.number()
		.min(0, 'Must be above -1')
		.max(3, 'Must be be below 4')
		.required('This field is required')
		.typeError('Must be a number'),
	cross_initiation_line: Yup.bool(),
	auto_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	auto_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	spill_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(2, 'Must be below 3')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_upper_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_upper_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_low_scored_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	teleop_low_missed_balls: Yup.number()
		.min(0, 'Must be above -1')
		.max(100, 'Must be below 101')
		.required('This field is required')
		.typeError('Must be a number'),
	defense: Yup.number()
		.min(0, 'Must be above -1')
		.max(4, 'Must be below 5')
		.required('This field is required')
		.typeError('Must be a number'),
	comment: Yup.string().max(500, 'Max of 500 characters').required('This field is required'),
});

export default formSchema;
