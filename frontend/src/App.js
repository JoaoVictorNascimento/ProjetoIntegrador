import React from 'react';

import './theme/default.scss';
import 'antd/dist/antd.css';
import Providers from './components/Providers';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
};

export default App;
