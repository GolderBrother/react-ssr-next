import { withRouter } from "next/router";
import Link from 'next/link';
import { Menu, Layout, Icon } from "antd";
const { Sider, Content } = Layout;
function UserLayout(props) {
    return (
        <>
            <style jsx>
                {
                    `a{
                            display:inline-block!important;
                        }`
                }
            </style>
            <Layout>
                <Sider>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[props.router.pathname]}
                        defaultSelectedKeys={[props.router.pathname]}
                    >
                        <Menu.Item key="/user/list">
                            <Icon type="user" /><Link href="/user/list"><a>用户列表</a></Link>
                        </Menu.Item>
                        <Menu.Item key="/user/add">
                            <Icon type="user" /><Link href="/user/add"><a>添加用户</a></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: 10 }}>
                    {props.children}
                </Content>
            </Layout>
        </>
    )
}

export default withRouter(UserLayout);