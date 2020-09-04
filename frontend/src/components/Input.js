import React, { PureComponent, lazy, Suspense } from 'react';

import {
    Input as AntInput, Form, Switch, Checkbox,
} from 'antd';
import omit from 'lodash/omit';

import { wrapFormField } from '../helpers/form-helper';

const DatePicker = lazy(() => import('./DatePicker'));
const Select = lazy(() => import('./Select'));
const DateRangePicker = lazy(() => import('./DateRangePicker'));

const { TextArea } = AntInput;
const { Item } = Form;

class Input extends PureComponent {

    _onDateChange = value => {
        const { input: { onChange } } = this.props;
        onChange(value);
    }

    _getValidateStatus = () => {
        const { meta } = this.props;

        const { valid, touched } = meta;

        if (!touched) return null;

        return valid ? 'success' : 'error';
    }

    _renderTextInput = props => {
        const {
            input, ...others
        } = props;
        return (
            <AntInput
                {...others}
                {...input}
            />
        );
    }

    _renderTextArea = props => {
        const {
            input, ...others
        } = props;
        return (
            <TextArea
                {...others}
                {...input}
            />
        );
    }

    _renderDatePicker = props => {
        const {
            input, dateFormat,
            ...others
        } = props;
        return (
            <DatePicker
                {...others}
                {...input}
                onChange={this._onDateChange}
                format={dateFormat}
            />
        );
    }

    _renderSelect = props => {
        const {
            input = {},
            ...others
        } = props;
        return (
            <Select
                {...others}
                {...input}
            />
        );
    }

    _renderDateRangePicker = props => {
        const {
            input = {}, dateFormat,
            ...others
        } = props;
        return (
            <DateRangePicker
                {...others}
                {...input}
                onChange={this._onDateChange}
                format={dateFormat}
            />
        );
    }

    _renderHelp = () => {
        const {
            charCounter, maxLength, meta, input,
            errorMessage, help,
        } = this.props;

        const { value } = input;
        const {
            error, valid, touched, submitError,
        } = meta;

        if (touched && !valid) {
            return errorMessage || error || submitError;
        }

        if (charCounter) {
            const charCounterMessage = charCounter
                ? `${(value || '').length} / ${maxLength}`
                : null;
            return charCounterMessage;
        }

        return help;
    }

    _renderSwitch = props => {
        const {
            input = {},
            ...others
        } = props;
        const { value, ...othersInput } = input;

        return (
            <Switch
                {...others}
                {...othersInput}
                checked={value || false}
            />
        );
    }

    _renderCheckbox = props => {
        const {
            input = {},
            ...others
        } = props;

        return (
            <Checkbox
                {...others}
                {...input}
            />
        );
    }

    _renderInputComponent = () => {
        const {
            input,
        } = this.props;

        const { type } = input;

        const inputProps = omit(this.props, [
            'label', 'formItemProps', 'charCounter',
            'hasFormItem', 'meta',
        ]);

        switch (type) {
            case 'date':
                return this._renderDatePicker(inputProps);
            case 'textarea':
                return this._renderTextArea(inputProps);
            case 'select':
                return this._renderSelect(inputProps);
            case 'daterange':
                return this._renderDateRangePicker(inputProps);
            case 'switch':
                return this._renderSwitch(inputProps);
            case 'checkbox':
                return this._renderCheckbox(inputProps);
            default:
                return this._renderTextInput(inputProps);
        }
    }

    render() {
        const {
            label, formItemProps,
            required, meta, hasFeedback,
            hasFormItem,
        } = this.props;

        if (!hasFormItem) return this._renderInputComponent();

        return (
            <Suspense fallback="Carregando...">
                <Item
                    label={label}
                    help={this._renderHelp()}
                    hasFeedback={!meta.active && meta.touched && hasFeedback}
                    validateStatus={this._getValidateStatus()}
                    required={required}
                    {...formItemProps}
                >
                    {this._renderInputComponent()}
                </Item>
            </Suspense>
        );
    }

}

Input.defaultProps = {
    meta: {},
    hasFormItem: true,
};

Input.Field = wrapFormField(Input);

export default Input;
