import { useState } from 'react';
import UserLayout from '.';
import { Button } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import axios from '../../utils/axios';
import dynamic from 'next/dynamic';
const UserInfo = dynamic(import('../../components/UserInfo'));
function UserDetail(props) {
    let [show, setShow] = useState(false);
    return (
        <UserLayout>
            <p>ID:{props.router.query.id}</p>
            <Button onClick={() => setShow(!show)}>显示/隐藏</Button>
            {
                show && <UserInfo user={props.user} />
            }
        </UserLayout>
    )
}
//获取此组件的初始化属性对象 
UserDetail.getInitialProps = async (ctx) => {
    let res = await axios.get(`/api/users/${ctx.query.id}`);
    return { user: res.data.data };
}
export default withRouter(UserDetail);