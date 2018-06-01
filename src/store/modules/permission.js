import router from '@/router'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { getToken, setToken, removeToken, getInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
// joseph added
function filterGongnengPermission(role, route) {
  if (!role.childList || !role.childList.length) return
  const _permission = {}
  role.childList.forEach(child => {
    _permission[child.menuId] = true
  })
  route.meta.permission = _permission
}
/**
 * 通过meta.resCode判断当前菜单是否匹配权限
 * @param roles
 * @param route
 */
function checkPermission(roles, route) {
  if (route.meta && route.meta.menuId) {
    let thisRole
    const hasPermission = roles.some(role => {
      if (route.meta.menuId === role.menuId) {
        thisRole = role
        filterGongnengPermission(role, route)
        return true
      }
      return false
    })
    return hasPermission ? { hasPermission, thisRole } : { hasPermission: false }
  } else {
    return { hasPermission: false }
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // if (route.temp === true) { // 开发阶段针对还没设置权限的导航
    //   console.log(route.name + ': 此导航是临时的，还没配置权限！')
    //   return true
    // }
    if (route.hidden === true) return true
    const { hasPermission, thisRole } = checkPermission(roles, route)
    if (hasPermission) {
      if (route.children && route.children.length && thisRole.childList && thisRole.childList.length) {
        route.children = filterAsyncRouter(route.children, thisRole.childList)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data
        const userInfo = getInfo()
        commit('SET_INTRODUCTION', userInfo)
        let accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
