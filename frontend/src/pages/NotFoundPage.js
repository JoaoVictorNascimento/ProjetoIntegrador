import React, { PureComponent } from 'react';

import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends PureComponent {

    state = {}

    render() {
        const { returnPath } = this.props;
        return (
            <PageHeader
                title="Página não encontrada"
            >
                <p>
                    Voltar para a <Link to={returnPath}>Página Inicial</Link>.
                </p>
            </PageHeader>
        );
    }

}

NotFoundPage.defaultProps = {
    returnPath: '/',
};
