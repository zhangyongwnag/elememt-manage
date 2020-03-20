const Login = () => import("@/views/login.vue")
const Home = () => import("@/views/home.vue")
const Main = () => import("@/components/main")
const Error = () => import("@/views/404")

/**
 * @description route表meta中可配置的参数
 * meta: {
 *  title: { String|Number|Function } 显示在侧边栏、面包屑和标签栏的文字
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  showAlways: 无论children有多少都展示
 *  noAccess: (false) 设为true后列表始终会存在，不受权限影响
 * }
 *
 */

export default [
    {
        path: '/',
        redirect: {
            name: 'Home'
        },
        meta: {
            hideInMenu: true,
            noAccess:true
        }
    },
    {
        path: '/home',
        name: '',
        component: Main,
        meta: {
            title: '首页',
            hideInMenu: false,
            icon: 'home fa-2x',
            showAlways: false,
            noAccess:true
        },
        children: [
            {
                path: '/home/',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页',
                    icon: 'home fa-2x',
                    hideInMenu: false
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            icon: 'edit',
            hideInMenu: true,
            showAlways: false,
            hideInBread: true,
            noAccess:true
        },
    },
    // 404
    {
        path: '/404',
        name: '404',
        component: Error,
        meta: {
            title: 'Page Not Found',
            icon: 'edit',
            hideInMenu: true,
            showAlways: false,
            hideInBread: true,
            noAccess:true
        },
    },
    // 动态路由
    {
        path: '/argu',
        name: 'argu',
        meta: {
            hideInMenu: true,
            noAccess:true
        },
        component: Main,
        children: [
            {
                path: 'params/:id',
                name: 'params',
                meta: {
                    title: route => `params-${route.params.id}`,
                },
                component: () => import('@/views/argu-page/params.vue')
            },
            {
                path: 'query',
                name: 'query',
                meta: {
                    title: route => `query-${route.query.id}`,
                },
                component: () => import('@/views/argu-page/query.vue')
            },
        ]
    },
  {
    path: '/page1',
    name: 'page1',
    component: Main,
    meta: {
      title: '用户管理',
      hideInMenu: false,
      icon: 'home fa-2x',
      showAlways: true,
    },
    children: [
      {
        path: '/page1/user',
        name: 'user',
        component: Main,
        meta: {
          title: '用户管理',
          icon: 'home fa-2x',
        }
      }
    ]
  },
  {
    path: '/page2',
    name: 'page2',
    component: Main,
    meta: {
      title: '测试页面',
      hideInMenu: false,
      icon: 'home fa-2x',
      showAlways: true,
    },
    children: [
      {
        path: '/page2/test1',
        name: 'test1',
        component: Main,
        meta: {
          title: '测试页面',
          icon: 'home fa-2x',
        }
      }
    ]
  },
  {
    path: '/page3',
    name: 'page3',
    component: Main,
    meta: {
      title: '测试页面2',
      hideInMenu: false,
      icon: 'home fa-2x',
      showAlways: true,
    },
    children: [
      {
        path: '/page3/test2',
        name: 'test2',
        component: Main,
        meta: {
          title: '测试页面2',
          icon: 'home fa-2x',
        }
      }
    ]
  },
]
