import VMasker from 'vanilla-masker';

export const removeMask = text => {
    if (String.isString(text)) {
        return text.replace(/[^\d]/g, '');
    }
    return text;
};

export const maskDate = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '99/99/9999') : ''
);