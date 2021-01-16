import { Layout, Menu, Row, Col, Dropdown } from 'antd';
import './index.less';
import { HomeIcon, CipherIcon, WarnIcon, ManageIcon } from './svg.js';
import Login from '@/pages/login/login.tsx';
import { ConnectProps, connect, IndexModelState, Link } from 'umi';
import { useEffect, useState } from 'react';
import userImg from './img/user.png';

const minHeight = document.body.clientHeight - 136 + 'px';

const { Header, Content, Footer, Sider } = Layout;
const menuData1 = [
  { route: '/', name: '首页', icon: HomeIcon },
  { route: '/cipher', name: '密码应用', icon: CipherIcon },
  { route: '/risk', name: '风险监控', icon: WarnIcon },
  { route: '/manage', name: '系统管理', icon: ManageIcon },
];
interface PageProps extends ConnectProps {
  index: IndexModelState;
}
const BasicLayout: FC<PageProps> = props => {
  const [menu, setMenu] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const {
    location: { pathname },
    children,
  } = props;
  const { index, dispatch } = props;
  useEffect(() => {
    dispatch!({
      type: 'index/login',
    });
    dispatch!({
      type: 'index/getMenu',
      callback: data => {
        window.localStorage.clear();
        // const arrManage =  [{list:[{menuId:'93'}, {menuId:'130'}, {menuId:'131'}, {menuId:'137'}, {menuId:'139'}, {menuId:'140'}, {menuId:'166'}, {menuId:'171'}]}];
        const arrManage = data.filter(item => {
          return item.menuId === 89;
        });
        if (arrManage.length > 0) {
          window.localStorage.setItem(
            'manage',
            arrManage[0].list.map(item => item.menuId).toString(),
          );
        }
        const arrHome = data.filter(item => {
          return item.menuId === 81;
        });
        // const arrHome =  [{list:[{menuId:'82'}, {menuId:'83'}, {menuId:'84'}, {menuId:'85'}]}];
        if (arrHome.length > 0) {
          window.localStorage.setItem(
            'home',
            arrHome[0].list.map(item => item.menuId).toString(),
          );
        }
        const arrMM = data.filter(item => {
          return item.menuId === 87;
        });
        // const arrMM =  [{list:[{menuId:'141'}, {menuId:'142'}, {menuId:'143'}]}];
        if (arrMM.length > 0) {
          window.localStorage.setItem(
            'mm',
            arrMM[0].list.map(item => item.menuId).toString(),
          );
        }
        const arrFX = data.filter(item => {
          return item.menuId === 88;
        });
        // const arrFX =  [{list:[{menuId:'145'}, {menuId:'146'}]}];
        if (arrFX.length > 0) {
          window.localStorage.setItem(
            'fx',
            arrFX[0].list.map(item => item.menuId).toString(),
          );
        }
        setMenu([...data]);
        // setMenu([{name:'首页'}, {name:'密码应用'},{name:'风险监控'},{name:'系统管理'},])
      },
    });
  }, []);
  useEffect(() => {
    const temp = [];
    menu.forEach(item => {
      menuData1.forEach(it => {
        if (it.name === item.name) {
          temp.push(it);
        }
      });
    });
    setMenuData([...temp]);
  }, [menu]);
  const loginOut = () => {
    window.localStorage.clear();
    document.cookie = 'JSESSIONID=""';
    window.location.href = window.location.origin + '/login.html';
  };
  const menu2 = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={loginOut}>
          退出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Sider
        width="112px"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          style={{
            backgroundColor: '#056ace',
            height: '100%',
            paddingTop: '45%',
          }}
          defaultSelectedKeys={[pathname]}
        >
          {menuData.map(menu => (
            <Menu.Item key={`${menu.route}`} style={{ height: '90px' }}>
              <Link to={menu.route}>
                <menu.icon style={{ fontSize: '32px' }} className="iconTitle" />
                <div className="title"> {menu.name}</div>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            boxShadow: ' 0px 5px 3px #E2E7EB',
            zIndex: '999',
          }}
        >
          <Row>
            <Col span={20}>
              <div
                style={{
                  color: '#056ace',
                  fontWeight: '800',
                  fontSize: '2rem',
                  padding: '0 31px',
                }}
              >
                密码应用在线管理平台
              </div>
            </Col>
            <Col span={3} offset={1}>
              <Dropdown overlay={menu2}>
                <img style={{ width: '15%' }} src={userImg} />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 0,
              minHeight,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright © 2011-2020</Footer>
      </Layout>
    </Layout>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(
  BasicLayout,
);
