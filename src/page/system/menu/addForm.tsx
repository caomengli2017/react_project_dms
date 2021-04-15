import { FFormItemIconSelector } from '@src/component';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Radio,
  Row,
  Space,
  Switch,
} from 'antd';
import intl from 'react-intl-universal';

interface IAddFormProps extends ModalProps {
  visible: boolean;
}
const labelCol = {
  xs: { span: 24 },
  sm: { span: 6 },
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 16 },
};
const AddForm = (props: IAddFormProps) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <Modal
      onCancel={props.onCancel}
      visible={props.visible}
      title={intl.get('add_menu')}
      width={1000}
      footer={null}
    >
      <Form labelCol={labelCol} wrapperCol={wrapperCol} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={intl.get('menu_name')}
              name="menu_name"
              rules={[{ required: true, message: intl.get('rule_menu_name') }]}
            >
              <Input placeholder={intl.get('rule_menu_name')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get('menu_id')}
              name="menu_id"
              rules={[{ required: true, message: intl.get('rule_menu_id') }]}
            >
              <Input placeholder={intl.get('rule_menu_id')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={intl.get('menu_parent')}
              name="menu_parent"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* 菜单层级 */}
          <Col span={12}>
            <Form.Item
              label={intl.get('menu_level')}
              name="menu_level"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="菜单">菜单</Radio>
                <Radio value="目录">目录</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {/* 主页面选择 */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              tooltip={intl.get('tooltip_redirect')}
              label={intl.get('redirect')}
              name="is_root"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={intl.get('web_component')}
              name="web_component"
              rules={[
                { required: true, message: intl.get('rule_web_component') },
              ]}
            >
              <Input placeholder={intl.get('rule_web_component')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get('route_url')}
              name="route_url"
              rules={[{ required: true, message: intl.get('rule_route_url') }]}
            >
              <Input placeholder={intl.get('rule_route_url')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="sort" label={intl.get('sort')}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          {/* icon 选择 */}
          <Col span={12}>
            <Form.Item name="icon" label={intl.get('icon')}>
              <FFormItemIconSelector placeholder={intl.get('rule_icon')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              valuePropName="checked"
              name="is_show"
              label={intl.get('is_show')}
            >
              <Switch defaultChecked />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Space>
            <Button onClick={props.onCancel}>{intl.get('cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {intl.get('confirm')}
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddForm;
