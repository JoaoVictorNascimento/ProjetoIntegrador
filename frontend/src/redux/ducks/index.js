import { combineReducers } from 'redux';

import * as usuario from './usuario';

export const reducers = combineReducers({
    ...usuario.reducers,
});

export const actions = {
    usuario: usuario.actions,
};
