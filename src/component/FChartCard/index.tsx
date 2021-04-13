import { Card } from 'antd';
import React, { FC } from 'react';
import './index.less';

interface IFChartCardProps {
  name?: string;
  total?: string | number;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}
const PREFIX = 'f-chart-card';
const FChartCard: FC<IFChartCardProps> = ({ name, total, content, footer }) => {
  return (
    <Card>
      <div className={PREFIX}>
        <div className={`${PREFIX}-name`}>
          <span>{name}</span>
        </div>
        <div className={`${PREFIX}-total`}>
          <span>{total}</span>
        </div>
        <div className={`${PREFIX}-content`}>{content}</div>
        <div className={`${PREFIX}-footer`}>{footer}</div>
      </div>
    </Card>
  );
};

export default FChartCard;
