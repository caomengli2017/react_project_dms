import { Row, Col, Card, Statistic } from 'antd';
import React, { memo } from 'react';

const CardList = () => {
  return (
    <Row gutter={15}>
      <Col style={{ marginBottom: 15 }} xs={12} md={12} xl={6}>
        <Card>
          <Statistic title="总销售额" value={11} />
        </Card>
      </Col>
      <Col style={{ marginBottom: 15 }} xs={12} md={12} xl={6}>
        <Card>
          <Statistic title="总销售额" value={11} />
        </Card>
      </Col>
      <Col style={{ marginBottom: 15 }} xs={12} md={12} xl={6}>
        <Card>
          <Statistic title="总销售额" value={11} />
        </Card>
      </Col>
      <Col style={{ marginBottom: 15 }} xs={12} md={12} xl={6}>
        <Card>
          <Statistic title="总销售额" value={11} />
        </Card>
      </Col>
    </Row>
  );
};

export default memo(CardList);
