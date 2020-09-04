export function extractRequestError(err, defaultMessage) {
    if (axios.isCancel(err)) {
        return {};
    }

    if (__DEV__) {
        console.warn(err);
    }

    const { response } = err;
    if (!response) {
        message.error('Você parece estar offline, verifique sua conexão com a internet.');
        return {};
    }

    const { error } = response.data;
    const errorFunc = errorCodes[error.code];
    if (typeof errorFunc === 'function') {
        return errorFunc(response);
    }

    return defaultErrorMessage(response, defaultMessage);
}