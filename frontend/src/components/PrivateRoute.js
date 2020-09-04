import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RedirectToLogin = props => {
    const to = useMemo(() => ({
        pathname: '/login',
        state: { from: props.location },
    }), [props.location]);

    return (
        <Redirect
            to={to}
        />
    );
};

RedirectToLogin.propTypes = {
    location: PropTypes.string.isRequired,
};

const PrivateRoute = ({
    render,
    component,
    usuarioLogado, ...others
}) => {
    return (
        <Route
            {...others}
            render={usuarioLogado ? render : RedirectToLogin}
            component={usuarioLogado ? component : RedirectToLogin}
        />
    );
};

PrivateRoute.propTypes = {
    ...Route.propTypes,
};

const mapStateToProps = ({ usuarioLogado }) => {
    return {
        usuarioLogado,
    };
};

export default connect(mapStateToProps)(PrivateRoute);