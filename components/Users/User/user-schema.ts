import * as Yup from 'yup';

const REQUIRED = 'This field is required.';

const cyclicDep: [string, string] = ['newPassword', 'newPassword'];

const userSchema = Yup.object().shape(
	{
		firstName: Yup.string().min(2, 'Must have at least 2 characters.').required(REQUIRED),
		lastName: Yup.string().min(2, 'Must have at least 2 characters.').required(REQUIRED),
		teamNumber: Yup.number().min(1, 'Must be at least 1.').required(REQUIRED),
		newPassword: Yup.string()
			.notRequired()
			.nullable()
			.when('newPassword', {
				is: (value: string) => value?.length,
				then: (rule) => rule.min(4, 'Must be at least 4 characters.'),
			}),
		administator: Yup.boolean().typeError('This must be true of false.'),
	},
	[cyclicDep],
);

export default userSchema;
