import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row, TooltipProps } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import './index.less';
import { Rule } from 'rc-field-form/lib/interface';

const defSpan = 24 / 3;
const threshold = 6;
const PREFIX = 'f-filter';
// const defLayout = { sm: { span: 24 }, md: { span: 5 } };
interface IFFilterProps {
  items?: IFormItem[];
  onSearch: (values: { [key: string]: any }) => void;
}
interface IFormItem {
  id: string;
  label: React.ReactNode;
  tooltip?: React.ReactNode | (TooltipProps & { icon: React.ReactNode });
  initialValue?: any;
  span?: number;
  rule?: Rule[];
  labelCol?: Object;
  _node?: React.ReactNode;
}

const FFilter = ({ items, onSearch }: IFFilterProps) => {
  const [expand, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(!expand);
  };

  const getFields = useMemo(() => {
    if (!items) return [];
    const count = expand ? items.length : threshold;
    const children = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      children.push(
        <Col
          md={item.span || defSpan}
          sm={24}
          key={i}
          style={{ display: i < count ? 'block' : 'none' }}
        >
          <Form.Item
            name={item.id}
            label={item.label}
            tooltip={item.tooltip}
            labelCol={item.labelCol}
            rules={item.rule}
          >
            {item._node}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }, [expand, items]);
  const onFinish = (value: any) => {
    console.log(value);
    onSearch(value);
  };
  return (
    <Form className={PREFIX} onFinish={onFinish}>
      <Row gutter={24}>{getFields}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button type="default" style={{ marginLeft: 8 }}>
            重置
          </Button>
          {items && items.length > threshold && (
            <Button
              style={{ marginLeft: 8 }}
              type="link"
              icon={expand ? <UpOutlined /> : <DownOutlined />}
              onClick={onExpand}
            >
              {expand ? '收起' : '展开'}
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default FFilter;
