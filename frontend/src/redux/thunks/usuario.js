import axios from 'axios';
import JwtDecode from 'jwt-decode';
import moment from 'moment-timezone';

import { createAbility } from '../../helpers/ability-helper';
import UserPreferences from '../../helpers/user-preferences-helper';
import { actions } from '../ducks/usuario';

const TOKEN_KEY = 'TOKEN_KEY';
const USER_KEY = 'USER_KEY';

export const setAuthenticationUser = user => {
    return async (dispatch, getState) => {
        await UserPreferences.setItem(USER_KEY, user);
        dispatch(actions.setUsuarioLogado(user));
    };
};

const setAuthenticationToken = token => {
    return async (dispatch, getState) => {
        await UserPreferences.setItem(TOKEN_KEY, token);
        dispatch(actions.setToken(token));
    };
};

export const setAuthenticationData = ({
    token, usuario, rules, skipRefreshToken,
}) => {
    return async (dispatch, getState) => {
        await dispatch(setAuthenticationToken(token));
        await dispatch(setAuthenticationUser(usuario));
        dispatch(actions.setSkipRefreshToken(skipRefreshToken));
        dispatch(actions.setAbility(createAbility(rules)));
    };
};

export const removeAuthenticationData = () => {
    return async (dispatch, getState) => {
        UserPreferences.clear();
        dispatch(actions.logoutUsuario());
        dispatch(actions.setAbility(createAbility([])));
    };
};

const decodeToken = token => {
    try {
        return JwtDecode(token);
    } catch (ex) {
        console.warn(ex);
    }
    return null;
};

export const loadAuthenticationData = () => {
    return async (dispatch, getState) => {
        const token = await UserPreferences.getItem(TOKEN_KEY);
        if (!token) {
            return false;
        }

        const payload = decodeToken(token);
        if (!payload) {
            return false;
        }

        const expirationDate = moment(payload.ext * 1000);
        if (moment().isAfter(expirationDate)) {
            await dispatch(removeAuthenticationData());
            return false;
        }

        const user = await UserPreferences.getItem(USER_KEY);
        dispatch(actions.setToken(token));
        dispatch(actions.setUsuarioLogado(user));
        dispatch(actions.setSkipRefreshToken(false));

        return true;
    };
};

export const refreshUserAuthentication = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put('/login');
            return dispatch(setAuthenticationData(response.data));
        } catch (ex) {
            const { response } = ex;
            if (response && response.status === 403) {
                return dispatch(removeAuthenticationData());
            }
            throw ex;
        }
    };
};

export default {};