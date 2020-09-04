import React, { forwardRef, useCallback, memo } from 'react';

import {
    Select as AntSelect,
    Button, Spin,
} from 'antd';
import pick from 'lodash/pick';

import useClassNames from '../hooks/use-classnames';

import styles from './Select.module.scss';

const { Option } = AntSelect;

const pickOptionProps = option => {
    return pick(option, ['key', 'label', 'value', 'item']);
};

const Select = memo(forwardRef(({
    options, mode, onChange,
    renderOption, value, onAddClick,
    onLoadMoreClick, loading, className,
    ...others
}, $ref) => {

    const handleChange = useCallback((val, option) => {
        if (!option || !option.length) {
            onChange(mode === 'multiple' ? [] : null);
        }
    }, [onChange, mode]);

    const getValue = useCallback(() => {
        if (mode === 'multiple') {
            return Array.isArray(value) ? value : [];
        }
        return value || undefined;
    }, [value, mode]);

    const handleSelect = useCallback((val, option) => {
        if (mode === 'multiple') {
            onChange([...getValue(), pickOptionProps(option)]);
        } else {
            onChange(pickOptionProps(option));
        }
    }, [getValue, onChange, mode]);

    const handleDeselect = useCallback((val, option) => {
        if (mode === 'multiple') {
            onChange(getValue().filter(opt => (opt.value || opt.key) !== val.value));
        }
    }, [getValue, onChange, mode]);

    const selectClasses = useClassNames([styles.select, className]);

    const renderSelectOption = option => {
        const {
            key, label, disabled, item,
        } = option;
        return (
            <Option
                key={key}
                disabled={disabled}
                value={key}
                label={label}
                item={item}
            >
                {renderOption(option)}
            </Option>
        );
    };

    const renderDropdown = useCallback(menu => (
        <div>
            {onAddClick ? (
                <Button
                    className={styles.optionButton}
                    onClick={onAddClick}
                >
                    Adicionar
                </Button>
            ) : null}
            {menu}
            {loading
                ? (
                    <div className={styles.loadingContainer}>
                        <Spin className={styles.spin} />
                        <span>Aguarde...</span>
                    </div>
                )
                : onLoadMoreClick
                    ? (
                        <Button
                            className={styles.optionButton}
                            onClick={onLoadMoreClick}
                        >
                            Carregar mais
                        </Button>
                    )
                    : null}
        </div>
    ), [loading, onAddClick, onLoadMoreClick]);

    return (
        <AntSelect
            dropdownRender={renderDropdown}
            {...others}
            ref={$ref}
            className={selectClasses}
            value={getValue()}
            labelInValue
            mode={mode}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            onChange={handleChange}
        >
            {options.map(renderSelectOption)}
        </AntSelect>
    );
}));

Select.defaultProps = {
    renderOption: option => option.label,
    filterOption: (input, option) => {
        const inputStr = input.accentsFolding().toLowerCase();
        const childrenStr = (option.props.label || option.props.children).accentsFolding().toLowerCase();
        return childrenStr.includes(inputStr);
    },
};

export default Select;
