import React, { lazy } from 'react';

import { Route } from 'react-router-dom';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

const ROUTES = [
    {
        path: '/',
        component: LandingPage,
        exact: true,
    },
    {
        path: '/login',
        component: LoginPage,
    },
];

export default ROUTES;

const getRoutes = route => {
    if (route.group) {
        return route.routes.reduce((result, r) => {
            return [...result, ...getRoutes(r)];
        }, []);
    }
    return [route];
};

export const allRoutes = getRoutes({
    group: 'root',
    routes: ROUTES,
});

export const renderRoute = (route, index) => {
    const { component: Comp } = route;
    return (
        <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            component={Comp}
        />
    );
};