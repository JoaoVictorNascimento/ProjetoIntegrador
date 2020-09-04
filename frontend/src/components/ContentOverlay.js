import React from 'react';

import PropTypes from 'prop-types';

import styles from './ContentOverlay.module.scss';

const ContentOverlay = props => {
    const { visible, onClick, style } = props;
    if (!visible) return null;
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            className={styles.container}
            style={style}
        />
    );
};

ContentOverlay.propTypes = {
    visible: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};

ContentOverlay.defaultProps = {
    visible: false,
    style: null,
};

export default ContentOverlay;
