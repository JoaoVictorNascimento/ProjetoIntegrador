import { message } from 'antd';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';

const errorCodes = {
    30: response => ({
        [FORM_ERROR]: 'Atualize a página e tente novamente.'
            + 'Houve um erro ao validar os seus dados, ou não foi possível verificar a autenticidade do reCAPTCHA.'
        ,
    }),
    51: response => {
        message.error('Você não tem permissão, tente novamente mais tarde.');
    },
    101: response => {
        message.error('Credenciais inválidas');
    },
    109: response => ({
        senhaAtual: 'Senha atual inválida.',
    }),
};

export function extractRequestError(err, defaultMessage) {
    if (axios.isCancel(err)) {
        return {};
    }

    const { response } = err;
    if (!response) {
        message.error('Você parece estar offline, verifique sua conexão com a internet.');
        return {};
    }

    function defaultErrorMessage(response, defaultMessage) {
        const { status } = response;
        if ([412, 422].includes(status)) {
            message.error('Não foi possível concluir a operação, verifique os dados informados e tente novamente.');
            return {};
        }
    
        if (status === 403) {
            message.error('Operação não autorizada.');
            return {};
        }
    
        message.error(defaultMessage);
        return {};
    }

    const { error } = response.data;
    const errorFunc = errorCodes[error.code];
    if (typeof errorFunc === 'function') {
        return errorFunc(response);
    }

    return defaultErrorMessage(response, defaultMessage);
}