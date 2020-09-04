import moment from 'moment-timezone';

import store from '../redux/store';

export function tokenInterceptor(request) {
    const { token } = store.getState();
    if (token && !request.headers.token) {
        request.headers.token = token;
    }
    request.headers.timezone = moment.tz.guess();
    return request;
}
