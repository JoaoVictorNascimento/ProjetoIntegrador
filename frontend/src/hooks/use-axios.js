import { useEffect, useMemo, useState } from 'react';

import Axios from 'axios';

import { tokenInterceptor } from '../helpers/axios-helper';

const { CancelToken } = Axios;

const useAxios = axiosOptions => {
    const [options] = useState(axiosOptions);

    const source = useMemo(() => CancelToken.source(), []);

    const axios = useMemo(() => {
        const instance = Axios.create({
            ...options,
            cancelToken: source.token,
        });

        instance.interceptors.request.use(tokenInterceptor);

        return instance;
    }, [source, options]);

    useEffect(() => {
        return () => {
            source.cancel('Operation canceled by unmounted component.');
        };
    }, [source]);

    return axios;
};

export default useAxios;
