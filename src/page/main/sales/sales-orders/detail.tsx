import { ModalProps, Modal, Button, Row } from 'antd';
import React from 'react';

interface IDetailProps extends ModalProps {}
const DetailPage = (props: IDetailProps) => {
  return (
    <Modal
      visible={props.visible}
      width={1000}
      title="详情"
      onOk={props.onOk}
      onCancel={props.onCancel}
      footer={
        <Row justify="end">
          <Button onClick={props.onCancel} type="primary">
            关闭
          </Button>
        </Row>
      }
      maskClosable={false}
    ></Modal>
  );
};
export default DetailPage;
