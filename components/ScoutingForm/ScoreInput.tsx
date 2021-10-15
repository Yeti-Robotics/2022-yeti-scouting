import { Form } from '@/models/form';
import { Control, Controller, FieldPath } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import { ScoreInputStyles } from './ScoutingFormStyles';

interface ScoreInputProps {
    label: string;
    name: FieldPath<Form>;
    control: Control<Form>;
    defaultValue?: number;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ label, name, defaultValue, control, ...inputProps }) => {

    const validateChange = (input: number, type: number) => {
        if (input - 1 < 0) return input;
        if (type > 0) return input + 1;
        if (type < 0) return input -1;
        if (type === 0) throw new Error('type argument to validateChange must be above or below 0');
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || 0}
            render={({ field: { value, onChange, name, ref } }) =>
            (
            <>
            <label>{label}</label>
            <ScoreInputStyles>
                <button style={{ left: -40, borderRadius: '3px 0 0 3px' }} type='button' disabled={value < 1} onClick={() => onChange(value - 1)}>-</button>
                <input type='number' name={name} value={value} ref={ref} disabled />
                <button style={{ right: -40 }} type='button' onClick={() => onChange(value + 1)}>+</button> 
            </ScoreInputStyles>
            </>
            )}
        />
    );
}

export default ScoreInput;