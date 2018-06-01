import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

// 在开发中，不使用延迟加载，因为加载太多的页面会导致webpack热更新太慢。所以只有在生产中使用延迟加载;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * 路由配置
 * hidden: true                    当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
 * alwaysShow: true                当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
 *                                 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
 * redirect: noredirect            当设置 noredirect 的时候该路由不会在面包屑导航中出现
 * name:'router-name'              设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
 * meta : {
    roles: ['admin','editor']      设置该路由进入的权限，支持多个权限叠加
    title: 'title'                 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'               设置该路由的图标
    noCache: true                  如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/cadres-details',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'index',
        name: 'cadresDetails',
        component: _import('cadres-details/index'),
        meta: {
          title: '干部详情',
          icon: 'cadre-screen',
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard', // 控制面板
        name: 'Dashboard',
        component: _import('dashboard/index'),
        meta: {
          title: '干部首页',
          icon: 'cadre-home' ,
          'menuId': '4126'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // 干部筛选
  {
    path: '/cadre-screen',
    component: Layout,
    redirect: '/cadre-selection/index',
    meta: {
      title: '干部筛选',
      icon: 'cadre-screen'  ,
      'menuId': '4127'
    },
    children: [
      {
        path: 'cadre-selection',
        name: 'cadreSelection',
        component: _import('cadre-selection/index'),
        meta: {
          title: '干部筛选',
          icon: 'cadre-screen' ,
          'menuId': '4127'
        }
      },
    ]
  },
  {
    path: '/cadre-screen',
    component: Layout,
    // redirect: '/cadre-selection/index',
    meta: {
      title: '干部筛选',
      icon: 'cadre-screen'  ,
      'menuId': 'cadreScreen'
    },
    children: [
      {
        path: 'cadre-selection',
        name: 'cadreSelection',
        component: _import('cadre-selection/index'),
        meta: {
          title: '干部筛选',
          icon: 'cadre-screen' ,
          'menuId': 'cadreSelection'
        }
      },
      {
        path: 'cadre-select',
        name: 'cadreSelect',
        component: _import('cadre-select/index'),
        meta: {
          title: '干部筛选1',
          icon: 'cadre-screen',
          'menuId': 'cadreSelect'
        }
      },
    ]
  },
  // 干部审核
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '干部审核',
      icon: 'cadre-audit',
      'menuId': 'Example'
    },
    children: [
      {
        path: 'cadre-update-information-audit',
        name: 'cadreUpdateInformationAudit',
        component: _import('cadre-update-information-audit/index'),
        meta: {
          title: '干部审核',
          icon: 'cadre-audit',
          'menuId': 'cadreUpdateInformationAudit'
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: {
          title: '干部审核1',
          icon: 'table',
          'menuId': 'Table'
        },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree',
          'menuId': 'Tree'
        }
      }
    ]
  },
  // 个人信息
  {
    path: '/personal-details',
    component: Layout,
    redirect: '/personal-details/index',
    meta: {
      title: '个人信息',
      icon: 'form',
      'menuId': 'PersonalDetails'
    },
    children: [
      {
        path: 'index',
        name: 'PersonalDetails',
        component: _import('personal-details/index'),
        meta: {
          title: '个人信息',
          icon: 'form',
          'menuId': 'PersonalDetails'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
