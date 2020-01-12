import { Form, Input, Button, Icon, message } from 'antd';
import axios from '../utils/axios';
import router from 'next/router';
import Head from 'next/head';

function Login(props) {
    let { getFieldDecorator } = props.form;
    async function handleSubmit(event) {
        event.preventDefault();
        let values = props.form.getFieldsValue();
        let res = await axios.post('/api/login', values);
        if (res.data.code === 0) {
            router.push('/');
        } else {
            message.error('登录失败');
        }
    }
    return (
        <>
            <Head>
                <title>我是登录页</title>
                <meta name="description" content="我是登录页描述"></meta>
            </Head>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                     </Button>
                </Form.Item>
            </Form>
        </>

    )
}

let WrappedLogin = Form.create({ name: 'Login' })(Login);
export default WrappedLogin;