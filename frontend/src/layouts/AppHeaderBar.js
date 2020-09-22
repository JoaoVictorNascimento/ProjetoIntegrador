import React, { Component } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import {
    Layout, Avatar,
    Button, Popover,
    Divider,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { connectScreenSize } from '../helpers/screen-size-helper';
import { actions } from '../redux/ducks';
import thunks from '../redux/thunks';

import styles from './AppHeaderBar.module.scss';

const { Header } = Layout;

class AppHeaderBar extends Component {

    _logout = () => {
        const { removeAuthenticationData } = this.props;
        removeAuthenticationData();
        this.props.history.push('/login');
    }

    _renderUsuarioOpcoes = () => {
        return (
            <div>
                <Divider className={styles.optionDivider} />
                <Link
                    to="/app/perfil"
                >
                    Perfil
                </Link>
                <Divider className={styles.optionDivider} />
                <a onClick={this._logout} role="button" tabIndex={0}>
                    Sair
                </a>
            </div>
        );
    }

    render() {
        const {
            toggleSidebar, sidebarCollapsed,
        } = this.props;
        return (
            <Header className={styles.header}>

                <div className={styles.headerContainer}>
                    <div className={styles.menuButton}>
                        <Button onClick={toggleSidebar}>
                            {sidebarCollapsed ? (
                                <MenuFoldOutlined />
                            ) : (
                                <MenuUnfoldOutlined />
                            )}
                        </Button>
                    </div>

                    <div className={styles.avatarContainer}>
                        <Popover
                            placement="bottomRight"
                            content={this._renderUsuarioOpcoes()}
                            trigger="focus"
                        >
                            <a onClick={null} role="button" tabIndex="-1">
                                <Avatar
                                    icon={<UserOutlined />}
                                    className={styles.avatar}
                                />
                            </a>
                        </Popover>
                    </div>
                </div>

            </Header>
        );
    }

}

AppHeaderBar.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    sidebarCollapsed: PropTypes.bool.isRequired,
};

const HeaderBarWithRouter = withRouter(AppHeaderBar);

const mapStateToProps = ({
    sidebarCollapsed, usuarioLogado,
}) => ({
    sidebarCollapsed,
    usuarioLogado,
});

const mapDispatchToProps = ({
    toggleSidebar: actions.sidebar.toggleSidebar,
    removeAuthenticationData: thunks.usuario.removeAuthenticationData,
});

const HeaderBarRedux = connect(mapStateToProps, mapDispatchToProps)(HeaderBarWithRouter);

export default connectScreenSize(HeaderBarRedux);
