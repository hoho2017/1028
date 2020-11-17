import { Layout, Menu } from 'antd';
import './index.less';
import { Link } from 'umi';
import { HomeIcon, CipherIcon, WarnIcon, ManageIcon } from './svg.js';

const minHeight = document.body.clientHeight - 136 + 'px';

const { Header, Content, Footer, Sider } = Layout;
const menuData = [
  { route: '/', name: '首页', icon: HomeIcon },
  { route: '/cipher', name: '密码应用', icon: CipherIcon },
  { route: '/risk', name: '风险控制', icon: WarnIcon },
  { route: '/manage', name: '系统管理', icon: ManageIcon },
];

function BasicLayout(props) {
  const {
    location: { pathname },
    children,
  } = props;

  return (
    <Layout>
      <Sider
        width="112px"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
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
        />
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
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
