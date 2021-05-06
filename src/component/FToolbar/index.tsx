import { IBtnsProp, IFToolBarProps } from '@src/types/baseTypes';
import { Col, Row } from 'antd';
import _ from 'lodash';
import React, { useCallback } from 'react';
import './index.less';

const PREFIX = 'f-toolbar';

const FToolBar = ({ leftNode, rightNode }: IFToolBarProps) => {
  const buildToolbarBtns = useCallback((btns?: IBtnsProp) => {
    if (Array.isArray(btns) && btns.length > 0) {
      let nodes = [];
      for (const btn of btns) {
        let Btn: any = btn;
        nodes.push(React.cloneElement(Btn, { key: _.uniqueId('btn_') }));
      }
      return nodes;
    }
    return null;
  }, []);
  if (!leftNode && !rightNode) return null;
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
