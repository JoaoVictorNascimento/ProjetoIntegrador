import React, { PureComponent } from 'react';

import { Alert as AntAlert } from 'antd';
import PropTypes from 'prop-types';

import styles from './Alert.module.scss';

class Alert extends PureComponent {

    _captureRef = ref => {
        if (ref && this.props.autoScroll) {
            ref.scrollIntoView();
        }
    }

    render() {
        const {
            type, message,
            onClose, banner,
        } = this.props;

        if (!message) {
            return null;
        }

        return (
            <div ref={this._captureRef}>
                <AntAlert
                    type={type}
                    closable
                    message={message}
                    afterClose={onClose}
                    className={styles.alert}
                    banner={banner}
                />
            </div>
        );
    }

}

Alert.propTypes = {
    banner: PropTypes.bool,
    autoScroll: PropTypes.bool,
    type: PropTypes.oneOf([
        'success',
        'error',
        'info',
    ]),
    message: PropTypes.string,
    onClose: PropTypes.func,
};

Alert.defaultProps = {
    banner: false,
    autoScroll: true,
    type: 'info',
    message: null,
    onClose: () => {},
};

export default Alert;
