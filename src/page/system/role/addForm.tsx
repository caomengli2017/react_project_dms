import {
  Button,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Space,
  TreeSelect,
} from 'antd';
import intl from 'react-intl-universal';
import React, { useEffect, useState } from 'react';
import { getMenuList } from '@src/apis/system/menu';
import { IMenuConfigs } from '@src/types/system';
interface IAddFormProps extends ModalProps {
  visible: boolean;
}

const treeFormat = (arr: IMenuConfigs[]) => {
  return arr.map((val) => {
    const obj: any = {
      title: val.name,
      value: val.id,
      key: val.id,
    };
    if (val.children) {
      obj['children'] = treeFormat(val.children);
    }
    return obj;
  });
};
const AddForm = (props: IAddFormProps) => {
  const [menuList, setMenuList] = useState<IMenuConfigs[]>([]);
  useEffect(() => {
    getMenuList().then((res) => {
      console.log(treeFormat(res.data));
      setMenuList(treeFormat(res.data));
    });
  }, []);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <Modal
      onCancel={props.onCancel}
      visible={props.visible}
      title={intl.get('add_role')}
      footer={null}
    >
      <Form onFinish={onFinish}>
        <Form.Item name="name" label={intl.get('role_name')}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label={intl.get('role_desc')}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="auth" label={intl.get('role_auth')}>
          <TreeSelect
            treeData={menuList}
            treeDefaultExpandAll
            treeCheckable={true}
            showCheckedStrategy={'SHOW_PARENT'}
          />
        </Form.Item>
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
