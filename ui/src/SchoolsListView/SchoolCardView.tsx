import React from 'react';
import { List, Card, Row, Col, Typography, Statistic } from 'antd';

import { School } from '../School';

export default function SchoolCardView(school: School) {
  const {
    name,
    studentCount,
    address: { street, suburb, postcode, state },
  } = school;

  return (
    <List.Item>
      <Card title={name} hoverable>
        <Row justify="space-between">
          <Col span={12}>
            <Typography.Text>
              {street},<br />
            </Typography.Text>
            <Typography.Text>
              {suburb},<br />
            </Typography.Text>
            <Typography.Text>
              {postcode},<br />
            </Typography.Text>
            <Typography.Text>{state}</Typography.Text>
          </Col>
          <Col span={12}>
            <Statistic title="students" value={studentCount} />
          </Col>
        </Row>
      </Card>
    </List.Item>
  );
}
