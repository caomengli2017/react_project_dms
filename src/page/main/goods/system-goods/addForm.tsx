import { FFormItemUpload } from '@src/component';
import FTableView from '@src/component/FTableView';
import { Button, Col, Form, Input, Modal, ModalProps, Row, Tabs } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

interface IAddFormProps extends ModalProps {}

const labelCol = {
  flex: '100px',
};
const { TabPane } = Tabs;

const AddForm = (props: IAddFormProps) => {
  return (
    <Modal
      title="新增商品"
      visible={props.visible}
      onCancel={props.onCancel}
      width={1000}
      footer={null}
    >
      <Tabs type="card">
        <TabPane tab={intl.get('basicInfo')} key="1">
          <BasicInfoBox />
        </TabPane>
        <TabPane tab={intl.get('spec')} key="2">
          <SpecInfoBox />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
const BasicInfoBox = () => {
  return (
    <Form labelCol={labelCol}>
      <Row>
        <Col span={12}>
          <Form.Item label={intl.get('fc_brandName')}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={intl.get('fc_name')}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label={intl.get('fc_goodsNumber')}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={intl.get('c_stock')}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={intl.get('goodsDesc')}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item label={intl.get('goodsImage')}>
        <FFormItemUpload
          maxLength={3}
          uploadState={{ listType: 'picture-card' }}
        />
      </Form.Item>
      <Row justify="center">
        <Button type="primary" htmlType="submit">
          {intl.get('save')}
        </Button>
      </Row>
    </Form>
  );
};

const SpecInfoBox = () => {
  return (
    <FTableView
      queryApi=""
      rowKey="id"
      columns={[
        {
          title: 'id',
          dataIndex: 'id1',
        },
      ]}
    />
  );
};

export default AddForm;
