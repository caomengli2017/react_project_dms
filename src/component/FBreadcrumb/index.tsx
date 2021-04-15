import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

type IPathItemProps = {
  path?: string;
  name: string;
};

interface IFBreadcrumbProps {
  breadcrumbs?: IPathItemProps[];
}
const PREFIX = 'f-breadcrumb';
const FBreadcrumb = ({ breadcrumbs }: IFBreadcrumbProps) => {
  return (
    <div className={PREFIX}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={'/'}>首页</Link>
        </Breadcrumb.Item>
        {breadcrumbs?.map((e, index) => (
          <Breadcrumb.Item key={index}>
            {e.path ? <Link to={e.path}>{e.name}</Link> : e.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default FBreadcrumb;
