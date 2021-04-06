import { IFTableProps } from '@src/types/baseTypes';
import { Table } from 'antd';
import React from 'react';
/**
 *
 * @author Leo
 * @desc table进行二次封装
 * @date 2021-04-02 16:57:04
 */
const FTable = (props: IFTableProps<any>) => {
  return <Table {...props} />;
};

export default FTable;
