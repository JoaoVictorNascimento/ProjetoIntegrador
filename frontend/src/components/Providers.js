import React, { useCallback, useMemo } from 'react';

import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MediaProvider } from 'react-screen-size';

import { history } from '../helpers/history-helper';
import { AntLocale } from '../helpers/locale-helper';
import { Medias } from '../helpers/screen-size-helper';
import store from '../redux/store';

const Providers = ({ children }) => {

    const mediaUpdateHandler = useCallback(ref => {
        if (ref) {
            ref.provider.update();
        }
    }, []);

    const iconClasses = useMemo(() => ({ className: 'react-icons' }), []);

    return (
        <IconContext.Provider value={iconClasses}>
            <ConfigProvider locale={AntLocale}>
                <Router history={history}>
                    <ReduxProvider store={store}>
                        <MediaProvider ref={mediaUpdateHandler} medias={Medias}>
                            {children}
                        </MediaProvider>
                    </ReduxProvider>
                </Router>
            </ConfigProvider>
        </IconContext.Provider>
    );

};

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;