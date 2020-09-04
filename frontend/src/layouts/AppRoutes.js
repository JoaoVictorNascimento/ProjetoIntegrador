import React, { Component, Suspense, lazy } from 'react';

import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { allRoutes, renderRoute, hasPermission } from '../routes/app';

import styles from './AppRoutes.module.scss';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const { Content } = Layout;

const renderNotFound = props => (
    <NotFoundPage {...props} returnPath="/app" />
);

class AppRoutes extends Component {

    state = {
        routes: allRoutes
            .filter(hasPermission)
            .map(renderRoute),
    };

    render() {
        const { routes } = this.state;
        return (
            <Content className={styles.content}>
                <Suspense fallback={<div>Carregando...</div>}>
                    <Switch>
                        {routes}
                        <Route render={renderNotFound} />
                    </Switch>
                </Suspense>
            </Content>
        );
    }

}

const mapStateToProps = state => ({
    tipoMenu: state.tipoMenuChangeHandler,
});

export default withRouter(connect(mapStateToProps)(AppRoutes));