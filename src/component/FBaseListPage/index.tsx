import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { FFilter, FPage, FToolBar, FTableView } from '..';
import { IFFilterRef } from '../FFilter';
import {
  IBaseListPageProps,
  IBaseListPageRef,
  ITableQueryParams,
  ITableViewRef,
} from '@src/types/baseTypes';
import { Object2SearchString, SearchString2Object } from '@src/utils/router';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import './index.less';

const PREFIX = 'f-list-page';

const FBaseListPage = forwardRef<IBaseListPageRef, IBaseListPageProps>(
  (props, ref) => {
    const location = useLocation();
    const filter = useRef<IFFilterRef>(null);
    const table = useRef<ITableViewRef>(null);
    const { leftNode, rightNode, conditions, ...tableProps } = props;
    const queryParams = useRef<ITableQueryParams>({
      page: 1,
      size: 10,
      v: 0,
      conditions: {},
    });
    const pushQueryParams = (params: Partial<ITableQueryParams>) => {
      queryParams.current = _.extend({}, table.current?.queryParams, params);
      // 修改table组件查询条件
      table.current?.setQueryParams(queryParams.current);
      // 调用查询接口
      table.current?.query();
      // 将查询数据添加到url
      window.history.pushState(
        null,
        '',
        location.pathname + Object2SearchString(queryParams.current)
      );
    };

    const handleSearch = (values: any) => {
      let p: Partial<ITableQueryParams> = {
        conditions: values,
        page: 1,
        v: new Date().getTime(),
      };
      pushQueryParams(p);
    };
    const _query = () => {
      table.current?.query();
    };
    const getSelectedRowKeys = () => {
      return table.current?.getSelectedRowKeys() ?? [];
    };
    const getSelectedRows = () => {
      return table.current?.getSelectedRows() ?? [];
    };
    useImperativeHandle(
      ref,
      () => ({
        query: _query,
        getSelectedRowKeys: getSelectedRowKeys,
        getSelectedRows: getSelectedRows,
      }),
      []
    );
    useEffect(() => {
      // 回写form筛选 首次调用查询
      if (filter.current && filter.current.form) {
        queryParams.current.conditions = filter.current.form.getFieldsValue();
        queryParams.current = SearchString2Object(
          location.search,
          queryParams.current
        );
        filter.current.form.setFieldsValue(queryParams.current.conditions);
        table.current?.setQueryParams(queryParams.current);
      }
      if (table.current) {
        table.current.query();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <div className={PREFIX}>
        <FToolBar leftNode={leftNode} rightNode={rightNode} />
        <FPage>
          <FFilter ref={filter} onSearch={handleSearch} items={conditions} />
          <FTableView
            ref={table}
            {...tableProps}
            selector={leftNode && leftNode.length > 0}
            firstQuery={false}
          />
        </FPage>
        {props.children}
      </div>
    );
  }
);

export default FBaseListPage;
