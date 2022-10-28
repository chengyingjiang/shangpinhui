import store from "@/store";
import UUID from 'uuid'

const USERINFOKEY = 'userinfokey'
const USERTEMPIDKEY = 'usertempidkey'

export function saveUserInfo(user) {
    store.set(USERINFOKEY, user)
}
export function getUserInfo() {
    return store.get(USERINFOKEY) || {}
}
export function removeUserInfo() {
    store.remove(USERINFOKEY)
}
export function getUserTempId() {
    // 从localStorage中读取
    let userTempId = store.get(USERTEMPIDKEY)
    // 如果localStorage中没有, 生成一个新的, 并保存到local中
    if (!userTempId) {
        userTempId = UUID.generate()
        store.set(USERTEMPIDKEY, userTempId)
    }
    // 返回它
    return userTempId
}