import App from 'next/app';
import Link from 'next/link';
import { Layout, Menu, Icon, Avatar, Spin } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'next/router';
import createStore from '../store';
import * as TYEPS from '../store/action-types';
import axios from '../utils/axios';
import { types } from 'util';
import { Provider } from 'react-redux'
import router from 'next/router';
const { Header, Footer, Content } = Layout;
const __REDUX_STORE__ = '__REDUX_STORE__';
function getStore(initialState) {
    if (typeof window == 'undefined') {
        //如果 在服务 器端运行的。那么直接创建新仓库返回
        return createStore(initialState);
    } else {//如果此代码是在客户端执行的,第一次会创建，以后每次都复用上一次创建的
        if (!window[__REDUX_STORE__]) {
            window[__REDUX_STORE__] = createStore(initialState);
        }
        return window[__REDUX_STORE__];
    }
}
class LayoutApp extends App<any> {
    store: any
    routeChangeStart: any
    routeChangeComplete: any
    state = {
        loading: false
    }
    constructor(props) {
        super(props);
        console.log('LayoutApp constructor');
        //此构造函数只会在客户端执行一次
        this.store = getStore(props.initialState);
    }
    static async getInitialProps({ Component, ctx }) {
        console.log('LayoutApp getInitialProps');
        let store = getStore({});
        let currentUser;
        let options: any = {
            url: '/api/currentUser'
        }
        //如果此方法是在服务器执行的，那么会有ctx.req属性，它代表本次node请求对象
        if (ctx.req && ctx.req.headers.cookie) {
            options.headers = options.headers || {};
            options.headers.cookie = ctx.req.headers.cookie;
        }
        let response = await axios(options);
        if (response.data.code === 0) {
            currentUser = response.data.data;
            store.dispatch({ type: TYEPS.SET_USER_INFO, payload: currentUser });
        }
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps, currentUser, initialState: store.getState() };
    }
    componentDidMount() {
        this.routeChangeStart = url => {
            this.setState({ loading: true });
        }
        this.routeChangeComplete = url => {
            this.setState({ loading: false });
        }
        router.events.on('routeChangeStart', this.routeChangeStart);
        router.events.on('routeChangeComplete', this.routeChangeComplete);
    }
    componentWillUnmount() {
        router.events.off('routeChangeStart', this.routeChangeStart);
        router.events.off('routeChangeComplete', this.routeChangeComplete);
    }
    render() {
        //Component就是页面组件
        let { Component } = this.props;
        let pathname = this.props.router.pathname;
        return (
            <Provider store={this.store}>
                <style jsx>
                    {
                        `a{
                            display:inline-block!important;
                        }`
                    }
                </style>
                <Layout>

                    <Header>
                        <img src="/images/jglogo.png"
                            style={{ width: 120, height: 31, margin: '16px 24px 16px 0px', float: "left" }}
                        />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px', display: 'inline-block' }}
                            selectedKeys={[pathname]}
                            defaultSelectedKeys={[pathname]}
                        >
                            <Menu.Item key="/">
                                <Icon type="home" /><Link href="/"><a>首页</a></Link>
                            </Menu.Item>
                            <Menu.Item key="/user">
                                <Icon type="user" /><Link href="/user"><a>用户管理</a></Link>
                            </Menu.Item>
                            <Menu.Item key="/profile">
                                <Icon type="profile" /><Link href="/profile"><a>个人中心</a></Link>
                            </Menu.Item>
                            <Menu.Item key="/login">
                                <Icon type="login" /><Link href="/login"><a>登录</a></Link>
                            </Menu.Item>
                        </Menu>
                        {
                            this.props.currentUser && (
                                <div style={{ display: 'inline-block', float: 'right', color: 'red' }}>
                                    <Avatar style={{ color: '#F00', backgroundColor: '#CCC' }}>
                                        {this.props.currentUser.username}
                                    </Avatar>
                                </div>
                            )
                        }
                    </Header>
                    {
                        this.state.loading ? <Spin style={{ fontSize: 50, margin: '50px auto' }} /> : <Component {...this.props.pageProps} />
                    }
                    <Footer style={{ textAlign: 'center' }}>@copyright 珠峰架构</Footer>
                </Layout>
            </Provider>

        )
    }
}
export default withRouter(LayoutApp);