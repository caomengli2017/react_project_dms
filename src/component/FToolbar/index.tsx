import { Col, Row } from 'antd';
import _ from 'lodash';
import React, { ReactNode } from 'react';
import './index.less';

type IBtnsProp = (ReactNode | (() => ReactNode))[];
interface IFToolBarProps {
  leftNode?: IBtnsProp;
  rightNode?: IBtnsProp;
}
const PREFIX = 'f-toolbar';

const FToolBar = ({ leftNode, rightNode }: IFToolBarProps) => {
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
const buildToolbarBtns = (btns?: (ReactNode | (() => ReactNode))[]) => {
  if (Array.isArray(btns) && btns.length > 0) {
    let nodes = [];
    for (const btn of btns) {
      let Btn: any = null;
      if (_.isFunction(btn)) {
        Btn = btn();
      } else {
        Btn = btn;
      }
      nodes.push(React.cloneElement(Btn, { key: _.uniqueId('btn_') }));
    }
    return nodes;
  }
  return null;
};
export default FToolBar;
