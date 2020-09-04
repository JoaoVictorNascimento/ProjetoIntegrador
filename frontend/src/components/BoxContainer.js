import React from 'react';

import {
    Row, Col, Layout,
} from 'antd';

import styles from './BoxContainer.module.scss';

const { Content } = Layout;

const BoxContainer = props => {
    const { children } = props;

    return (
        <Layout className={styles.layout}>
            <div className={styles.background} />
            <Content className={styles.content}>
                <Row className={styles.rowContainer}>
                    <Col className={styles.colContainer}>
                        <div className={styles.contentContainer}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default BoxContainer;