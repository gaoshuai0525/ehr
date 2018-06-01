import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// 进度条样式
import { getToken, getInfo } from '@/utils/auth' // 验权

NProgress.configure({ showSpinner: false })// no redirect whitelist

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken())  { // 确定是否有令牌
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前页面是指示板，将不会在每个钩子之后触发，所以手动处理它
    } else {
      if(store.getters.addRouters.length === 0){
        // const menus = (getInfo()).role.authList
        const menus = (getInfo()).managementMsg.menus[0].childrenMenus
        store.dispatch('GenerateRoutes', { menus }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置替换：true这样导航就不会留下历史记录
        })
      }
      else {
        next()
      }
      /*if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完用户信息
        store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
          const roles = res.data.role.authList // 注意：角色必须是一个数组！如: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置替换：true这样导航就不会留下历史记录
          })
          // next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证失败,请重新登录')
            next({ path: '/' })
          })
        })
      }
      else {
        next()
      }*/
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 如果当前页面的登录将不会触发每个钩子，所以手动处理它
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
