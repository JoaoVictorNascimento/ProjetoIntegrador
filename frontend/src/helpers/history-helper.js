import { createBrowserHistory } from 'history';
import queryString from 'query-string';

export const history = createBrowserHistory();

function getCurrentLocation() {
    return history.location;
}

const setQueries = queries => {
    const search = Object.keys(queries)
        .map(key => {
            const value = queries[key];
            if (value && typeof value === 'object') {
                return {
                    key,
                    value: JSON.stringify(value),
                };
            }
            return { key, value };
        })
        .reduce((result, { key, value }) => ({
            ...result,
            [key]: value,
        }), {});

    return history.push({
        pathname: getCurrentLocation().pathname,
        search: queryString.stringify(search),
    });
};

const getQueries = () => {
    const parsed = queryString.parse(getCurrentLocation().search);
    return parsed
        ? Object.keys(parsed)
            .map(key => {
                let value = parsed[key];
                try {
                    value = JSON.parse(value);
                } catch (ex) { /**/ }
                return { key, value };
            }).reduce((result, { key, value }) => ({
                ...result,
                [key]: value,
            }), {})
        : {};
};

const updateQuery = queries => {
    const newQueries = {
        ...getQueries(),
        ...queries,
    };
    return setQueries(newQueries);
};

export default {
    history,
    setQueries,
    getQueries,
    updateQuery,
};
