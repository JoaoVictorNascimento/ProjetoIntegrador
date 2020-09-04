import ptBR from 'antd/lib/locale-provider/pt_BR';

export const AntLocale = {
    ...ptBR,
    Pagination: {
        ...ptBR.Pagination,
        items_per_page: 'por página',
    },
    Table: {
        ...ptBR.Table,
        filterReset: 'Limpar',
        sortTitle: 'Clique para ordernar',
    },
};