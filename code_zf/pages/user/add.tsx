import UserLayout from './index';
import { Form, Input, Button, Icon, message } from 'antd';
import axios from '../../utils/axios';
import router from 'next/router';

function UserAdd(props) {
    let { getFieldDecorator } = props.form;
    async function handleSubmit(event) {
        event.preventDefault();
        let values = props.form.getFieldsValue();
        let res = await axios.post('/api/register', values);
        if (res.data.code === 0) {
            router.push('/user/list');
        } else {
            message.error('用户添加失败');
        }
    }
    return (
        <UserLayout>
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
                        添加用户
                     </Button>
                </Form.Item>
            </Form>
        </UserLayout>
    )
}

let WrappedUserAdd = Form.create({ name: 'UserAdd' })(UserAdd);
export default WrappedUserAdd;