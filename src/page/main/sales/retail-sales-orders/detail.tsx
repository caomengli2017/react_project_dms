import { ModalProps, Modal, Tabs } from 'antd';
import React from 'react';
import BasicInfo from './detail-views/basic-info';

interface IDetailProps extends ModalProps {
  orderCode: string;
  onRefresh: () => void;
}
const { TabPane } = Tabs;
const DetailPage = (props: IDetailProps) => {
  return (
    <Modal
      visible={props.visible}
      width={1200}
      title="订单详情"
      onCancel={props.onCancel}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Tabs type="card">
        <TabPane tab="基本信息" key="1">
          <BasicInfo orderCode={props.orderCode} onRefresh={props.onRefresh} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
export default DetailPage;
