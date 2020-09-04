import {
    createStore, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import { reducers, actions } from './ducks';

const mainReducer = (state, action) => {
    if (action.type === actions.usuario.logoutUsuario().type) {
        return reducers({}, action);
    }
    return reducers(state, action);
};

const store = createStore(
    mainReducer,
    applyMiddleware(thunk),
);

if (module.hot) {
    module.hot.accept('./ducks', () => {
        store.replaceReducer(mainReducer);
    });
}

export default store;