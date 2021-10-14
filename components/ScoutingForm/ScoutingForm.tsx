import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/models/form';
import { Checkbox, Field, Input, HoriSelect, Section } from './ScoutingFormStyles';

const defaultOptions = {
    required: true,
    max: 9999,
    min: 0,
};

const ScoutingForm = () => {
    const { register, handleSubmit } = useForm<Form>();

    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data)
        })} style={{ width: 'clamp(300px, 1000px, 100%)', display: 'grid', placeItems: 'center' }}>
            <Section>
                <h1>Match Info</h1>

                <Field>
                    <label htmlFor='team_number'>Team Number:</label>
                    <Input {...register('team_number', {...defaultOptions, valueAsNumber: true})} type='number' id='team_number' autoComplete='off' />
                </Field>
                <Field>
                    <label htmlFor='match_number'>Match Number:</label>
                    <Input {...register('match_number', {...defaultOptions, valueAsNumber: true})} type='number' id='match_number' autoComplete='off' />
                </Field>
            </Section>

            <Section>
                <h1>Autonomous</h1>

                <Field>
                    <label htmlFor='preload'>How many balls were preloaded?</label>
                    <HoriSelect {...register('preload', { ...defaultOptions, valueAsNumber: true })} id='preload' size={4}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </HoriSelect>
                </Field>
                <Field>
                    <label htmlFor='cross_initiaion_line'>Did the robot cross the initiation line? (moved)</label>
                    <Checkbox {...register('cross_initiation_line', defaultOptions)} type='checkbox' id='cross_initiation_line' />
                </Field>
                <Field>
                    <label htmlFor='spill_balls'>Ball spilled?</label>
                    <HoriSelect {...register('spill_balls', { ...defaultOptions, valueAsNumber: true })} id='spill_balls' size={3}>
                        <option value={0}>None</option>
                        <option value={1}>Some balls</option>
                        <option value={2}>Into another robot</option>
                    </HoriSelect>
                </Field>
            </Section>

            <Section>
                <h1>Other</h1>

                <Field>
                    <label htmlFor='comment'>Comments</label>
                    <textarea {...register('comment', { ...defaultOptions, maxLength: 500 })} id='comment' autoComplete='off' />
                </Field>
            </Section>

            <Input type='submit' />
        </form>
    );
}

export default ScoutingForm;