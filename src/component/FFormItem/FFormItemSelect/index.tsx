import HttpApi, { BaseHttpModel } from '@src/utils/https';
import { Select } from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
type IgetData<T> = (val: T) => any;
/**
 *
 * @author Leo
 * @desc 自动获取远程数据的select
 * @date 2021-04-29 15:07:17
 */
interface IFFormItemSelectProps<T = any> {
  value?: string | number;
  onChange?: (e: string | number) => void;
  queryApi: ((data?: any) => Promise<any>) | string;
  options: {
    getData?: IgetData<T>;
    name: string;
    value: string;
  };
  params?: {
    [key: string]: any;
  };
  placeholder?: string;
}
const FFormItemSelect = <T extends any>({
  value,
  onChange,
  queryApi,
  params,
  placeholder,
  options,
}: IFFormItemSelectProps<T>) => {
  let isUnmount = useRef(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    let promise: Promise<BaseHttpModel<any>>;
    if (_.isFunction(queryApi)) {
      promise = queryApi(params);
    } else {
      promise = HttpApi.request({
        url: queryApi as string,
        params,
      });
    }
    promise.then((res) => {
      !isUnmount.current && setData(res.data);
      // const _d = options.getData ? options.getData(res.data) : res.data;
      // const first = _.isArray(_d) ? _d[0][options.value] : undefined;
      // console.log(first);
      // onChange && onChange(first);
    });
    return () => {
      isUnmount.current = true;
    };
  }, [queryApi, params]);

  const selectOptions = useMemo(() => {
    if (!data) return null;
    const _d = options.getData ? options.getData(data) : data;
    if (!!_d) {
      if (_.isArray(_d)) {
        return _d.map((item: any, index) => (
          <Select.Option
            key={_.uniqueId(`select_${index}`)}
            value={item[options.value]}
          >
            {item[options.name]}
          </Select.Option>
        ));
      }
      return null;
    }
    return null;
  }, [data, options]);
  return (
    <Select value={value} onChange={onChange}>
      {selectOptions}
    </Select>
  );
};

export default FFormItemSelect;
