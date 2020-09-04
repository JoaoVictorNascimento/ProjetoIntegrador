import React, {
    forwardRef, useEffect, useMemo, memo,
} from 'react';

import { DatePicker } from 'antd';
import moment from 'moment-timezone';
import { findDOMNode } from 'react-dom';

import { maskDate } from '../helpers/masks';
import useClassNames from '../hooks/use-classnames';

import styles from './DateRangePicker.module.scss';

const { RangePicker } = DatePicker;

const normalizeValue = value => {
    if (!value || !value.length) return null;

    const normalized = value.map(val => {
        return !val || moment.isMoment(val)
            ? val
            : moment(val);
    });

    return normalized;
};

const DateRangePicker = memo(forwardRef(({
    className, format, value, ...others
}, $ref) => {
    const refCurrent = $ref && $ref.current;

    useEffect(() => {
        if (!refCurrent) return undefined;

        const eventListener = event => {
            const { value: targetValue } = event.target;
            const maskedValue = maskDate(targetValue, format);
            // eslint-disable-next-line no-param-reassign
            event.target.value = maskedValue;
        };

        const inputsDates = findDOMNode(refCurrent).querySelectorAll('input');
        inputsDates.forEach(inputEl => {
            // eslint-disable-next-line no-param-reassign
            inputEl.autocomplete = 'off';
            inputEl.addEventListener('keyup', eventListener);
        });

        return () => {
            inputsDates.forEach(inputEl => {
                inputEl.removeEventListener('keyup', eventListener);
            });
        };
    }, [refCurrent, format]);

    const normalizedValue = useMemo(() => normalizeValue(value), [value]);
    const classes = useClassNames([styles.datePicker, className]);

    return (
        <RangePicker
            {...others}
            ref={$ref}
            format={format}
            value={normalizedValue}
            className={classes}
        />
    );
}));

DateRangePicker.defaultProps = {
    animation: 'slide-up',
};

export default DateRangePicker;
