import 'moment/locale/pt-br'; // eslint-disable-line import/no-extraneous-dependencies
import Col from 'antd/lib/grid/col';
import axios from 'axios';
import './theme/default.scss';
import './helpers/polyfills-helper';
import { Form } from 'react-final-form';

import { history } from './helpers/history-helper';

let currentLocation = history.location;

Col.defaultProps = {
    ...Col.defaultProps,
    span: 24,
};

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.interceptors.request.use(tokenInterceptor);

Form.defaultProps = {
    ...Form.defaultProps,
    mutators: {
        ...arrayMutators,
        resetFields(args, mutableState, tools) {
            Object.keys(mutableState.fields).forEach(fieldName => {
                tools.resetFieldState(fieldName);
            });
        },
    },
};