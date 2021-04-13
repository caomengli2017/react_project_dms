import React, { FC } from 'react';
import classNames from 'classnames';
import './index.less';
/**
 *
 * @author Leo
 * @desc 基础模板页面
 * @date 2021-04-09 14:09:05
 */
interface IFPageProp {
  className?: string;
}

const PREFIX = 'f-page';
const FPage: FC<IFPageProp> = ({ className, children }) => {
  return <div className={classNames(PREFIX, className)}>{children}</div>;
};

export default FPage;
