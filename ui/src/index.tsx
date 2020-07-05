import * as React from 'react';
import { render } from 'react-dom';
import { Typography } from 'antd';
import { SchoolsListView } from './SchoolsListView';

const App = () => (
  <div>
    <Typography.Title level={1}>Skools List</Typography.Title>
    <SchoolsListView />
  </div>
);

render(<App />, document.getElementById('app-root'));
