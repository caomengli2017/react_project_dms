import React, { FC } from 'react';
import classNames from 'classnames';

interface IFPageProp {
  className?: string;
}

const PREFIX = 'f-page';
const FPage: FC<IFPageProp> = ({ className, children }) => {
  return <div className={classNames(PREFIX, className)}>{children}</div>;
};

export default FPage;
