import { Ability } from '@casl/ability';
import { handleAction, createAction, handleActions } from 'redux-actions';

const setUsuarioLogado = createAction('USUARIOS/SET_USUARIO_LOGADO');
const updateUsuarioLogado = createAction('USUARIOS/UPDATE_USUARIO_LOGADO');
const logoutUsuario = createAction('USUARIOS/LOGOUT');
const setToken = createAction('USUARIOS/SET_TOKEN');
const setAbility = createAction('USUARIOS/SET_ABILITY');
const setSkipRefreshToken = createAction('USUARIOS/SET_SKIP_REFRESH_TOKEN');

export const actions = {
    setUsuarioLogado,
    logoutUsuario,
    setToken,
    setAbility,
    updateUsuarioLogado,
    setSkipRefreshToken,
};

export const usuarioLogadoHandler = handleActions({
    [setUsuarioLogado]: (state, action) => ({
        ...action.payload,
    }),
    [updateUsuarioLogado]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, null);

export const tokenHandler = handleAction(
    setToken,
    (state, action) => action.payload,
    null,
);

export const abilityHandler = handleAction(
    setAbility,
    (state, action) => action.payload,
    new Ability([]),
);

export const skipRefreshTokenHandler = handleAction(
    setSkipRefreshToken,
    (state, action) => action.payload || false,
    false,
);

export const reducers = {
    usuarioLogado: usuarioLogadoHandler,
    token: tokenHandler,
    ability: abilityHandler,
    skipRefreshToken: skipRefreshTokenHandler,
};
