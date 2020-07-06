import React, { useState } from 'react';
import { render } from 'react-dom';
import { Typography, Col, Row, Button, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SchoolsListView } from './SchoolsListView';
import { AddSchoolView } from './AddSchoolView';

const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [schoolsAdded, setSchoolsAdded] = useState(0);

  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={24} md={22} lg={20} xl={18} xxl={18}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={1}>Skools List</Typography.Title>
            </Col>
            <Col>
              <Button
                title="Add School"
                size="large"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setDrawerVisible(!drawerVisible)}
              >
                Add School
              </Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <SchoolsListView signal={schoolsAdded} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="Add School"
        visible={drawerVisible}
        placement="right"
        closable
        onClose={() => setDrawerVisible(false)}
        destroyOnClose
        width="500"
      >
        <AddSchoolView
          onFailed={() => {}}
          onItemAdded={() => {
            setDrawerVisible(false);
            setSchoolsAdded(schoolsAdded + 1);
          }}
        />
      </Drawer>
    </>
  );
};

render(<App />, document.getElementById('app-root'));
