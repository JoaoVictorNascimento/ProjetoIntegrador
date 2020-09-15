import moment from 'moment-timezone';

/* eslint-disable max-len */
const REGEX_COLOR = /^#[a-f\d]{6}$/i;
/* eslint-enable */

export const validatePassword = value => (
    !!value && value.length >= 6 && value.length <= 20 ? undefined
        : 'A senha deve conter no mínimo 6 e no máximo 20 caracteres'
);

export const validateNotEmpty = value => {
    let valid;
    if (typeof value === 'string') {
        valid = Boolean(value.trim());
    } else if (Array.isArray(value)) {
        valid = Boolean(value.length);
    } else {
        valid = Boolean(value);
    }
    return valid ? undefined : 'Campo obrigatório';
};

const isValidNumber = value => {
    switch (typeof value) {
        case 'number':
            return Number.isFinite(value);
        case 'string':
            return /^[0-9,.]+$/.test(value);
        default:
            return false;
    }
};

export const validateNumber = value => {
    return isValidNumber(value) ? undefined : 'Deve conter apenas números';
};

export const validateDate = value => {
    return moment(value, 'DD/MM/YYYY', true).isValid()
        ? undefined
        : 'Informe uma data válida no formato DD/MM/AAAA';
};

export const validateColor = value => {
    return REGEX_COLOR.test(value)
        ? undefined
        : 'Informe a cor no formato #AABBCC.';
};