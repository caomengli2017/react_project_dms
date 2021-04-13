import { Calendar, Card, Col, Row } from 'antd';
import './index.less';
import CardList from './view/card-list';
import ColumnView from './view/column-view';
import DynamicList from './view/dynamic-list';
import ProjectList from './view/project-list';

const PREFIX = 'dashboard';

const DashboardPage = () => {
  return (
    <div className={PREFIX}>
      <CardList />
      <Row gutter={15}>
        <Col xs={24} md={10}>
          <Card title="日程" style={{ height: '100%' }}>
            <Calendar />
          </Card>
        </Col>
        <Col xs={24} md={5}>
          <ProjectList />
        </Col>
        <Col xs={24} md={9}>
          <DynamicList />
          <ColumnView />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
