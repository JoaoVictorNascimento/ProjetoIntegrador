import get from 'lodash/get';
import Cookies from 'universal-cookie';

const maxAge = 315360000; // 10 anos em segundos

const cookies = new Cookies();
const DEFAULT_OPTIONS = { path: '/' };

export default {
    setItem(key, value, opts = { temporary: false }) {
        const options = {
            ...DEFAULT_OPTIONS,
            maxAge: opts.temporary ? undefined : maxAge,
            ...opts,
        };
        return cookies.set(key, {
            value,
            options,
        }, options);
    },

    getItem(key) {
        return get(cookies.get(key), 'value', undefined);
    },
    options(key) {
        return get(cookies.get(key), 'options', undefined);
    },

    removeItem(key) {
        return cookies.remove(key, DEFAULT_OPTIONS);
    },
    clear() {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach(ck => cookies.remove(ck, DEFAULT_OPTIONS));
        return allCookies;
    },
};
