import React, { memo } from 'react';

import { Spin } from 'antd';
import PropTypes from 'prop-types';

import useClassNames from '../hooks/use-classnames';

import styles from './SpinnerOverlay.module.scss';

const SpinnerOverlay = memo(({ className, ...others }) => {
    const wrapperClasses = useClassNames([styles.spin, className]);
    return (
        <Spin
            size="large"
            tip="Carregando ..."
            wrapperClassName={wrapperClasses}
            {...others}
        />
    );
});

SpinnerOverlay.propTypes = {
    spinning: PropTypes.bool,
};

SpinnerOverlay.defaultProps = {
    spinning: false,
};

export default SpinnerOverlay;
