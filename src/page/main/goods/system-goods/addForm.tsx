import { SystemGoodsModal } from '@src/types/model/goods';
import { Modal, ModalProps, Tabs } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import BasicInfoView from './form-views/basic-view';
import GoodsInfoView from './form-views/goods-view';
import SpecInfoView from './form-views/spec-view';

interface IAddFormProps extends ModalProps {
  data?: SystemGoodsModal;
  onRefresh: () => void;
}

const { TabPane } = Tabs;

const AddForm = ({ onRefresh, ...props }: IAddFormProps) => {
  return (
    <Modal
      title={props.data ? intl.get('edit_goods') : intl.get('add_goods')}
      visible={props.visible}
      onCancel={props.onCancel}
      width={1200}
      footer={null}
      destroyOnClose
    >
      <Tabs type="card">
        <TabPane tab={intl.get('basicInfo')} key="1">
          <BasicInfoView data={props.data} onRefresh={onRefresh} />
        </TabPane>
        {props.data && (
          <>
            <TabPane tab={intl.get('spec')} key="2">
              <SpecInfoView goodsId={props.data?.oid} />
            </TabPane>
            <TabPane tab={intl.get('goods')} key="3">
              <GoodsInfoView goodsId={props.data.oid} />
            </TabPane>
          </>
        )}
      </Tabs>
    </Modal>
  );
};

export default AddForm;
