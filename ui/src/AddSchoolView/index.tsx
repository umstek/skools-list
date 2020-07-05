import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Space } from 'antd';
import { School } from '../School';

const base_url = 'http://localhost:3000/schools';

async function addSchool(formFields: {
  name: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  studentCount: number;
}) {
  const { name, studentCount, ...address } = formFields;
  const school = { name, studentCount, address } as School;
  const response = await fetch(base_url, {
    method: 'POST',
    body: JSON.stringify(school),
  });
  if (!response.ok) {
    return 'Failed to add.';
  }
  const result = await response.json();
}

export function AddSchoolView(props: { onItemAdded: () => void; onFailed: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={async (formFields) => {
        setSubmitting(true);
        await addSchool(formFields as any);
        props.onItemAdded();
        setSubmitting(false);
      }}
      onReset={() => {
        form.resetFields();
      }}
    >
      <Form.Item name="name" label="School Name" rules={[{ required: true }]}>
        <Input disabled={submitting} />
      </Form.Item>
      <div>
        <Form.Item name="street" label="Street" rules={[{ required: true }]}>
          <Input disabled={submitting} />
        </Form.Item>
        <Form.Item name="suburb" label="Suburb" rules={[{ required: true }]}>
          <Input disabled={submitting} />
        </Form.Item>
        <Form.Item name="postcode" label="Postal Code" rules={[{ required: true }]}>
          <Input disabled={submitting} />
        </Form.Item>
        <Form.Item name="state" label="State" rules={[{ required: true }]}>
          <Input disabled={submitting} />
        </Form.Item>
      </div>
      <Form.Item name="studentCount" label="Student Count" rules={[{ required: true }]}>
        <InputNumber min={1} max={50000} step={10} disabled={submitting} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Add School
          </Button>
          <Button type="default" htmlType="reset" disabled={submitting}>
            Clear
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
