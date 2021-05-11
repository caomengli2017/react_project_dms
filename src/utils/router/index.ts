import _ from 'lodash';

const convertInner = (defaultValue: any, paramValue: any) => {
  if (paramValue != null) {
    if (_.isString(defaultValue)) {
      return paramValue;
    }
    if (_.isBoolean(defaultValue)) {
      if (paramValue === '1' || paramValue === 'true') {
        return true;
      }
      if (paramValue === '0' || paramValue === 'false') {
        return false;
      }
      return defaultValue;
    }
    if (_.isInteger(defaultValue)) {
      try {
        let val = parseInt(paramValue);
        return isNaN(val) ? defaultValue : val;
      } catch (err) {
        return defaultValue;
      }
    }
    if (_.isNumber(defaultValue)) {
      try {
        return parseFloat(paramValue);
      } catch (err) {
        return defaultValue;
      }
    }
    if (_.isFunction(defaultValue)) {
      return defaultValue(paramValue);
    }
    if (_.isObject(defaultValue)) {
      let params: any = {};
      try {
        params = JSON.parse(paramValue);
      } catch (err) {}
      _.forEach(defaultValue, (value, key) => {
        if (params[key]) {
          params[key] = convertInner(value, params[key]);
        } else {
          params[key] = value;
        }
      });
      return params;
    }
  } else {
    if (_.isFunction(defaultValue)) {
      return defaultValue();
    } else {
      return defaultValue;
    }
  }
  return paramValue;
};

/**
 * @author Leo
 * @desc 对象转url查询字符串
 * @date 2021-04-07 15:39:09
 */
const Object2SearchString = (queryParams: any): string => {
  let params = new URLSearchParams();
  for (const key in queryParams) {
    if (_.isObject(queryParams[key]) || _.isArray(queryParams[key])) {
      params.set(key, JSON.stringify(queryParams[key]));
      continue;
    }
    params.set(key, queryParams[key]);
  }
  let str = params.toString();
  return str ? `?${str}` : '';
};
/**
 *
 * @author Leo
 * @desc url查询字符串转对象
 * @date 2021-04-07 15:54:22
 * @param locationSearch url查询字符串
 * @param defaultValue 默认值，支持对象
 */
const SearchString2Object = (
  locationSearch: string,
  defaultValue: any
): any => {
  let params = new URLSearchParams(locationSearch);

  let result: any = {};
  _.forEach(defaultValue, (value, key) => {
    result[key] = convertInner(value, params.get(key));
  });
  return result;
};
const GetRequest = (url: string) => {
  var theRequest: any = {};
  if (url.indexOf('?') !== -1) {
    const str = url.split('?');
    const strs = str[1].split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }
  return theRequest;
};
export { Object2SearchString, SearchString2Object, GetRequest };
