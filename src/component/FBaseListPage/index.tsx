import {
  IBaseListPageProps,
  IBaseListPageRef,
  IListQueryParams,
  IPageRes,
} from '@src/types/baseTypes';
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from 'react';
import HttpApi, { BaseHttpModel } from '@src/utils/https';
import _ from 'lodash';
import { FPage, FFilter, FToolBar, FTable } from '..';
import { Object2SearchString, SearchString2Object } from '@src/utils/router';
import { useHistory, useLocation } from 'react-router';
import { IFFilterRef } from '../FFilter/index';
import { Alert } from 'antd';
import './index.less';

type IBaseListPageAction =
  | ((e: IBaseListPageProps) => IBaseListPageProps)
  | Object;

function BaseListReducer(
  state: IBaseListPageProps,
  action: IBaseListPageAction
) {
  if (_.isFunction(action)) {
    return { ...state, ...action(state) };
  }
  if (_.isObject(action)) {
    return { ...state, ...action };
  }
  return state;
}
const initialState: IBaseListPageProps = {
  queryApi: '',
  rowKey: 'id',
  columns: [],
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
};
const PREFIX = 'f-list-page';
const BaseListPage = (
  props: IBaseListPageProps,
  ref: ForwardedRef<IBaseListPageRef>
) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = useRef<IListQueryParams>({
    page: 1,
    size: 10,
    conditions: {},
    v: 0,
  });
  const filter = useRef<IFFilterRef>(null);
  useImperativeHandle(ref, () => ({}), []);
  const pushQueryParams = (params?: any) => {
    let query = queryParams.current;
    if (params) {
      queryParams.current = _.extend({}, query, params);
    }
    history.push({
      search: Object2SearchString(queryParams.current),
    });
  };
  const onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page,
    };
    if (pageSize) {
      obj.size = pageSize;
    }
    pushQueryParams(obj);
  };
  const onPageShowSizeChange = (page: number, pageSize: number) => {
    onPageChange(1, pageSize);
  };

  const handleSearch = (values: any) => {
    let p: Partial<IListQueryParams> = {
      conditions: values,
      v: new Date().getTime(),
    };
    if (state.pagination) {
      p.page = 1;
    }
    pushQueryParams(p);
  };
  // 状态
  const [state, dispatch] = useReducer(BaseListReducer, initialState, (e) => {
    if (e.pagination) {
      e.pagination.onChange = onPageChange;
      e.pagination.onShowSizeChange = onPageShowSizeChange;
    }
    if (props.leftNode && props.leftNode.length > 0 && e.tableProps) {
      e.tableProps.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          let tableProps = state.tableProps;
          if (tableProps && tableProps.rowSelection) {
            tableProps.rowSelection.selectedRowKeys = selectedRowKeys;
          }
          dispatch({ selectedRowKeys, selectedRows, tableProps });
        },
      };
    }
    return _.assign({}, e, props);
  });
  useEffect(() => {
    dispatch(props);
  }, [props]);
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
      let params = queryParams.current.conditions;
      if (state.pagination) {
        return {
          ...props.initalParams,
          ...params,
          size: queryParams.current.size,
          page: queryParams.current.page,
        };
      } else {
        return params;
      }
    };
    let promise: Promise<BaseHttpModel<IPageRes>>;
    if (_.isFunction(state.queryApi)) {
      promise = state.queryApi(getQueryParams());
    } else {
      promise = HttpApi.request<IPageRes>({
        url: state.queryApi as string,
        params: getQueryParams(),
      });
    }
    promise
      .then((res) => {
        let pagination = state.pagination;
        if (pagination) {
          pagination.current = res.data.page;
          pagination.pageSize = res.data.size;
          pagination.total = res.data.totalPage * 1;
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
  }, [state, queryParams, props.initalParams]);

  useEffect(() => {
    queryParams.current = SearchString2Object(
      location.search,
      queryParams.current
    );
    if (filter.current && filter.current.form) {
      filter.current.form.setFieldsValue(queryParams.current.conditions);
    }
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={PREFIX}>
      <FToolBar
        selectedRowKeys={state.selectedRowKeys}
        selectedRows={state.selectedRows}
        leftNode={state.leftNode}
        rightNode={state.rightNode}
      />
      <FFilter ref={filter} onSearch={handleSearch} items={state.conditions} />
      <FPage>
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
          rowKey={state.rowKey}
          columns={state.columns}
          size={'small'}
          dataSource={state.dataSource}
          pagination={state.pagination}
          {...state.tableProps}
        />
      </FPage>
      {props.children}
    </div>
  );
};
const FBaseListPage = forwardRef<IBaseListPageRef, IBaseListPageProps>(
  BaseListPage
);
export default memo(FBaseListPage);
