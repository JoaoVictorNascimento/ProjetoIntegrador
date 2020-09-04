import React, {
    useEffect, forwardRef, useMemo, memo,
} from 'react';

import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment-timezone';
import { findDOMNode } from 'react-dom';

import { maskDate } from '../helpers/masks';
import useClassNames from '../hooks/use-classnames';

import styles from './DatePicker.module.scss';

const normalizeValue = value => (!value || moment.isMoment(value) ? value : moment(value));

const DatePicker = memo(forwardRef(({
    format, className, value, ...others
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

        const inputDate = findDOMNode(refCurrent).querySelector('input');
        inputDate.autocomplete = 'off';
        inputDate.addEventListener('keyup', eventListener);

        return () => {
            inputDate.removeEventListener('keyup', eventListener);
        };
    }, [refCurrent, format]);

    const normalizedValue = useMemo(() => normalizeValue(value), [value]);
    const classes = useClassNames([styles.datePicker, className]);

    return (
        <AntDatePicker
            {...others}
            ref={$ref}
            className={classes}
            format={format}
            value={normalizedValue}
        />
    );
}));

DatePicker.defaultProps = {
    animation: 'slide-up',
};

export default DatePicker;
