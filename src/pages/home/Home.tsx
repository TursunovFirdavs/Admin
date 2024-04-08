import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={'/'}>Categories</Link>, '1'),
  getItem(<Link to={'/sub-category'}>Sub categories</Link>, '2'),
  getItem(<Link to={'/brands'}>Brand list</Link>, '3'),
  // getItem(<Link to={'/attribute'}>Attribute</Link>, '4'),
  getItem(<Link to={'/products'}>Products</Link>, '5'),
];

const Home: React.FC = () => {
  return (
    <div style={{display: 'flex', maxWidth: '100vw'}}>
        <div style={{ width: 256, height: '100vh', background: '#001529' }}>
        <h1 style={{color: '#fff', fontFamily: 'sans-serif', padding: '25px', paddingBottom: '10px', paddingLeft: '26px'}}>Admin</h1>
      <Menu 
        style={{height: '90vh'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
    </div>
  );
};

export default Home;