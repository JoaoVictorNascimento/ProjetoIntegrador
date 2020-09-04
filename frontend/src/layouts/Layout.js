import React, {
    useMemo, Suspense, useEffect,
    useState, lazy, useCallback,
} from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import thunks from '../redux/thunks';
import { allRoutes, renderRoute } from '../routes/public';

import AppLayout from './AppLayout';

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const hideSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('splash-screen-hide');
            setTimeout(
                () => splashScreen.parentNode.removeChild(splashScreen),
                1000,
            );
        }, 500);
    }
};

const Layout = ({ loadAuthenticationData }) => {
    const [ready, setReady] = useState(false);

    const loadData = useCallback(async () => {
        try {
            await loadAuthenticationData();
        } catch (ex) {
            console.warn(ex);
        } finally {
            setReady(true);
        }
    }, [loadAuthenticationData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (ready) {
            hideSplashScreen();
        }
    }, [ready]);

    const routes = useMemo(() => allRoutes.map(renderRoute), []);

    if (!ready) {
        return 'Carregando usuário...';
    }

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Switch>
                {routes}
                <PrivateRoute path="/app" component={AppLayout} />
                <Route component={NotFoundPage} />
            </Switch>
        </Suspense>
    );
};

const mapDispatchToProps = ({
    loadAuthenticationData: thunks.usuario.loadAuthenticationData,
});

export default connect(null, mapDispatchToProps)(Layout);
