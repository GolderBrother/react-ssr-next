import { createStore } from 'redux';
import *  as TYPES from './action-types';
let initialState = {
    currentUser: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_USER_INFO:
            return { currentUser: action.payload };
        default:
            return state;
    }
}
/**
 * 一般来说我们的仓库只有一份
 * 这个代码会在服务器端执行。
 * 每个客户端访问服务器的时候，都要创建一个新的仓库
 * @param initialState
 */
export default function (initialState) {
    return createStore(reducer, initialState);
}