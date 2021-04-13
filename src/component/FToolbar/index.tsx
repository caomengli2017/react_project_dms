import { Col, Row } from 'antd';
import _ from 'lodash';
import React, { ReactNode, useCallback } from 'react';
import './index.less';

type IBtnsProp = (
  | ReactNode
  | ((selectedRowKeys: React.Key[], selectedRows: any[]) => ReactNode)
)[];
interface IFToolBarProps {
  leftNode?: IBtnsProp;
  rightNode?: IBtnsProp;
  selectedRowKeys?: React.Key[]; //table 表格勾选  id集合
  selectedRows?: any[];
}
const PREFIX = 'f-toolbar';

const FToolBar = ({
  leftNode,
  rightNode,
  selectedRowKeys,
  selectedRows,
}: IFToolBarProps) => {
  const buildToolbarBtns = useCallback(
    (btns?: IBtnsProp) => {
      if (Array.isArray(btns) && btns.length > 0) {
        let nodes = [];
        for (const btn of btns) {
          let Btn: any = null;
          if (_.isFunction(btn)) {
            Btn = btn(selectedRowKeys || [], selectedRows || []);
          } else {
            Btn = btn;
          }
          nodes.push(React.cloneElement(Btn, { key: _.uniqueId('btn_') }));
        }
        return nodes;
      }
      return null;
    },
    [selectedRowKeys, selectedRows]
  );
  return (
    <Row className={PREFIX}>
      <Col className={`${PREFIX}-left`} span={12}>
        {buildToolbarBtns(leftNode)}
      </Col>
      <Col className={`${PREFIX}-right`} span={12}>
        {buildToolbarBtns(rightNode)}
      </Col>
    </Row>
  );
};

export default FToolBar;
