/**
 * Token  seesion和cookie 两种方式
 * @author zhangwei
 * @date 2018/4/4
 */
// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const infoKey = 'User-Info'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}
export function getInfo() {
  return JSON.parse(sessionStorage.getItem(infoKey))
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}
export function setUserInfo(userInfo) {
  return sessionStorage.setItem(infoKey, JSON.stringify(userInfo))
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}
export function removeUserInfo() {
  return sessionStorage.removeItem(infoKey)
  // return Cookies.remove(TokenKey)
}
