import { Button, Layout } from 'antd';
import router, { Router } from 'next/router';
import Head from 'next/head';
const { Content } = Layout;
export default function (props) {
    return (
        <>
            <Head>
                <title>我是首页</title>
                <meta name="description" content="我是首页描述"></meta>
            </Head>
            <Content>
                <div>首页</div>
                <Button onClick={() => router.push('/user')}>切换到/user</Button>
            </Content>
        </>
    )
}