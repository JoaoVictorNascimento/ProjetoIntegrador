import { combineReducers } from 'redux';

import * as sidebar from './sidebar';
import * as usuario from './usuario';

export const reducers = combineReducers({
    ...usuario.reducers,
    ...sidebar.reducers,
});

export const actions = {
    usuario: usuario.actions,
    sidebar: sidebar.actions,
};
