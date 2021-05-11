import {
  ITableQueryParams,
  IPageRes,
  ITableViewProps,
  ITableViewRef,
} from '@src/types/baseTypes';
import HttpApi, { BaseHttpModel } from '@src/utils/https';
import { Alert } from 'antd';
import _ from 'lodash';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from 'react';
import FTable from '../FTable';
import { TableViewReducer } from './reducer';
import './index.less';
/**
 * @author Leo
 * @desc table表格view 封装分页请求等
 * @date 2021-04-02 16:57:04
 */
const PREFIX = 'f-table-view';
const FTableView = forwardRef<ITableViewRef, ITableViewProps>((props, ref) => {
  const queryParams = useRef<ITableQueryParams>({
    page: 1,
    limit: 10,
    v: 0,
    conditions: {},
  });

  const onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page,
    };
    if (pageSize) {
      obj.limit = pageSize;
    }
    queryParams.current = _.extend({}, queryParams.current, obj);
    query();
  };
  const onPageShowSizeChange = (page: number, pageSize: number) => {
    onPageChange(1, pageSize);
  };
  // 状态
  const [state, dispatch] = useReducer(
    TableViewReducer,
    {
      pagination: {
        current: 1,
        pageSize: 10,
        showTotal: (total: number, range: [number, number]) =>
          `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '40', '60', '100', '150', '200'],
      },
      dataSource: [],
      tableProps: {},
    },
    (e) => {
      if (e.pagination) {
        e.pagination.onChange = onPageChange;
        e.pagination.onShowSizeChange = onPageShowSizeChange;
      }
      // 添加选择
      if (e.tableProps && !!props.selector) {
        e.tableProps.rowSelection = {
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            let tableProps = state.tableProps;
            if (tableProps && tableProps.rowSelection) {
              tableProps.rowSelection.selectedRowKeys = selectedRowKeys;
            }
            dispatch({ selectedRowKeys, selectedRows, tableProps });
          },
        };
      }
      return _.assign({}, e, props);
    }
  );
  // 数据查询
  const query = useCallback(() => {
    let tableProps = state.tableProps;
    if (
      tableProps &&
      tableProps.rowSelection &&
      state.selectedRowKeys &&
      state.selectedRowKeys.length > 0
    ) {
      tableProps.rowSelection.selectedRowKeys = [];
      dispatch({ tableProps, selectedRows: [], selectedRowKeys: [] });
    }
    dispatch({ querying: true });
    const getQueryParams = () => {
      const { limit, page, conditions } = queryParams.current;
      if (state.pagination) {
        return {
          ...props.initalParams,
          limit: limit,
          page: page,
          ...conditions,
        };
      } else {
        return {
          ...props.initalParams,
          ...conditions,
        };
      }
    };
    let promise: Promise<BaseHttpModel<IPageRes>>;
    if (_.isFunction(props.queryApi)) {
      promise = props.queryApi(getQueryParams());
    } else {
      promise = HttpApi.request<IPageRes>({
        url: props.queryApi as string,
        params: getQueryParams(),
      });
    }
    promise
      .then((res) => {
        let pagination = state.pagination;
        if (pagination) {
          pagination.current = res.data.page;
          pagination.pageSize = Math.ceil(res.data.total / res.data.totalPage);
          pagination.total = res.data.total;
        }
        dispatch({
          dataSource: res.data.list,
          pagination,
          querying: false,
        });
      })
      .catch((err) => {
        dispatch({ querying: false });
      });
  }, [state, queryParams, props]);
  useEffect(() => {
    if (props.firstQuery) query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setQueryParams = (e: ITableQueryParams) => {
    queryParams.current = _.assign({}, queryParams.current, e);
  };

  const getSelectedRowKeys = useCallback(() => {
    return state.selectedRowKeys || [];
  }, [state.selectedRowKeys]);
  const getSelectedRows = useCallback(() => {
    return state.selectedRows || [];
  }, [state.selectedRows]);
  useImperativeHandle(
    ref,
    () => ({
      query,
      getSelectedRowKeys: getSelectedRowKeys,
      getSelectedRows: getSelectedRows,
      queryParams: queryParams.current,
      setQueryParams,
    }),
    [query, getSelectedRowKeys, getSelectedRows]
  );
  return (
    <div>
      {state.selectedRowKeys && state.selectedRowKeys.length > 0 && (
        <Alert
          className={`${PREFIX}-alert`}
          message={
            <span>
              已选择<strong>{state.selectedRowKeys.length}</strong>项
            </span>
          }
          type="info"
        />
      )}
      <FTable
        loading={state.querying}
        rowKey={props.rowKey}
        columns={props.columns}
        size={'small'}
        dataSource={state.dataSource}
        pagination={state.pagination}
        {...state.tableProps}
      />
    </div>
  );
});
FTableView.defaultProps = {
  firstQuery: true,
};
export default FTableView;
