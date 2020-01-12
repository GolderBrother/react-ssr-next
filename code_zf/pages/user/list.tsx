import UserLayout from '.';
import { List } from 'antd';
import Link from 'next/link';
import axios from '../../utils/axios';
function UserList(props) {
    return (
        <UserLayout>
            <List
                header={<div></div>}
                footer={<div></div>}
                bordered
                dataSource={props.list}
                renderItem={
                    (item: any, index) => (
                        <List.Item>
                            <Link href={{ pathname: '/user/detail', query: { id: item._id } }}>
                                <a>{item.username}</a>
                            </Link>
                        </List.Item>
                    )
                }
            />
        </UserLayout>
    )
}
//获取此组件的初始化属性对象 
UserList.getInitialProps = async (ctx) => {
    let res: any = await axios.get('/api/users');
    return { list: res.data.data };//返回值将会成为当前组件的属性对象
}
export default UserList;