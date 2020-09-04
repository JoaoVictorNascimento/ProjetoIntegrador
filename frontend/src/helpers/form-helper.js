import React, { useCallback, forwardRef, memo } from 'react';

import moment from 'moment-timezone';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

export const hasValue = value => {

    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (value instanceof Date) return true;
    if (moment.isMoment(value)) return true;

    switch (typeof value) {
        case 'object':
            return Object.keys(value).length > 0;
        case 'number':
            return true;
        case 'string':
        default:
            return Boolean(value);
    }
};

const defaultParser = value => value;

export const wrapFormField = (Comp, defaultProps) => {
    const FieldWrapper = memo(forwardRef((props, ref) => {
        const { validate, required, ...others } = { ...defaultProps, ...props };

        const handleValidation = useCallback(value => {
            if (validate && (required || hasValue(value))) {
                return validate(value);
            }
            return undefined;
        }, [validate, required]);

        const renderField = useCallback(fieldProps => {
            return (
                <Comp ref={ref} {...fieldProps} />
            );
        }, [ref]);

        return (
            <Field
                parse={defaultParser}
                {...others}
                required={required}
                render={renderField}
                validate={handleValidation}
            />
        );
    }));

    return FieldWrapper;
};

export const wrapForm = (Comp, options = {
    validate: values => null,
    validateOnBlur: values => null,
}) => {

    let onSubmitCallback;

    const handleSubmitCallback = async (...args) => {
        if (onSubmitCallback) {
            const response = await onSubmitCallback(...args);
            return response;
        }
        return {};
    };

    const ComponentWrapper = memo(forwardRef(({ handleSubmit, ...others }, ref) => {

        const handleSubmitWrapper = useCallback(callback => {
            onSubmitCallback = callback;
            return handleSubmit;
        }, [handleSubmit]);

        return (
            <Comp
                ref={ref}
                handleSubmit={handleSubmitWrapper}
                {...others}
            />
        );
    }));

    const FromWrapper = memo(forwardRef((props, ref) => {
        const renderForm = useCallback(renderProps => {
            return <ComponentWrapper ref={ref} {...props} {...renderProps} />;
        }, [props, ref]);
        return (
            <Form
                {...options}
                // eslint-disable-next-line react/jsx-no-bind
                onSubmit={handleSubmitCallback}
                render={renderForm}
                validateOnBlur={false}
            />
        );
    }));

    return FromWrapper;
};

export const wrapFormFieldArray = Comp => {
    const FieldArrayWrapper = memo(forwardRef((props, ref) => {
        const renderContent = useCallback(arrayProps => {
            return (
                <Comp ref={ref} {...props} {...arrayProps} />
            );
        }, [props, ref]);
        return (
            <FieldArray name={props.name}>
                {renderContent}
            </FieldArray>
        );
    }));
    return FieldArrayWrapper;
};
