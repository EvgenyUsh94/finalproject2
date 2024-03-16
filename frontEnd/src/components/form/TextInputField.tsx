import React from 'react'
import { Form } from 'react-bootstrap';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface TextInputFieldProps {
    name: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ name, label, register, registerOptions, error, ...props }) => {
    return (
        <Form.Group className='mb-3' controlId={name + "Input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error.message}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

export default TextInputField;
