import React, { useEffect, useState, useCallback } from 'react';

import { Layout } from 'antd';
import { connect } from 'react-redux';

import thunks from '../redux/thunks';

import AppHeaderBar from './AppHeaderBar';
import styles from './AppLayout.module.scss';
import AppRoutes from './AppRoutes';

const style = { position: 'relative' };

const AppLayout = ({ refreshUserAuthentication, history, skipRefreshToken }) => {
    const [ready, setReady] = useState(false);

    const navigateToHome = useCallback(() => {
        history.push('/home');
    }, [history]);

    const navigateToLogin = useCallback(() => {
        history.push('/login');
    }, [history]);

    const refreshToken = useCallback(async () => {
        try {
            await refreshUserAuthentication();
            setReady(true);
        } catch (ex) {
            console.warn(ex);
            const { response } = ex;
            if (!response) {
                navigateToHome();
            } else {
                navigateToLogin();
            }
        }
    }, [navigateToHome, navigateToLogin, refreshUserAuthentication]);

    useEffect(() => {
        if (!skipRefreshToken) {
            refreshToken();
        } else {
            setReady(true);
        }
    }, [refreshToken, skipRefreshToken]);

    if (!ready) {
        return 'Carregando token...';
    }

    return (
        <div className={styles.container}>
            <Layout className={styles.layout}>

                <Layout style={style}>

                    <AppHeaderBar />
                    <AppRoutes />

                </Layout>
            </Layout>
        </div>
    );

};

const mapStateToProps = ({ skipRefreshToken }) => ({
    skipRefreshToken,
});

const mapDispatchToProps = {
    refreshUserAuthentication: thunks.usuario.refreshUserAuthentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
