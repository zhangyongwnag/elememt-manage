const Main  = () => import("@/components/main")

// 系统设置相关路由
const basicSetting = () => import('@/views/system-manage/basic-setting')
const handleLog = () => import('@/views/system-manage/handle-log')
const handleSetting = () => import('@/views/system-manage/handle-setting')
const handleWay = () => import('@/views/system-manage/handle-way')
const inlayBankManage = () => import('@/views/system-manage/inlay-bank-manange')
const roleManage = () => import('@/views/system-manage/role-manage')
const systemState = () => import('@/views/system-manage/system-state')
const userGroupMange = () => import('@/views/system-manage/user-group-manage')
const userMange = () => import('@/views/system-manage/user-manage')
const warningLog = () => import('@/views/system-manage/warning-log')
const warningManage = () => import('@/views/system-manage/warning-manage')

export default [
    {
        path: '/system',
        name: 'System',
        component: Main,
        meta: {
            title: '系统设置',
            icon: 'wrench',
        },
        redirect: {
            name: 'roleManage'
        },
        children: [
            // {
            //     path: '/system/basic-setting',
            //     name: 'basicSetting',
            //     component: basicSetting,
            //     meta: {
            //         title: '基础设置',
            //         icon: 'minus'
            //     }
            // },
            // {
            //     path: '/system/handle-log',
            //     name: 'handleLog',
            //     component: handleLog,
            //     meta: {
            //         title: '操作日志',
            //         icon: 'minus'
            //     }
            // },
            // {
            //     path: '/system/handle-setting',
            //     name: 'handleSetting',
            //     component: handleSetting,
            //     meta: {
            //         title: '操作设置',
            //         icon: 'minus'
            //     }
            // },
            // {
            //     path: '/system/handle-way',
            //     name: 'handleWay',
            //     component: handleWay,
            //     meta: {
            //         title: '操作方式',
            //         icon: 'minus'
            //     }
            // },
            // {
            //     path: '/system/inlay-bank-manage',
            //     name: 'inlayBankManage',
            //     component: inlayBankManage,
            //     meta: {
            //         title: '内置库管理',
            //         icon: 'minus'
            //     }
            // },
            {
                path: '/system/role-manage',
                name: 'roleManage',
                component: roleManage,
                meta: {
                    title: '角色管理',
                    icon: 'minus'
                }
            },
            {
                path: '/system/user-mange',
                name: 'userMange',
                component: userMange,
                meta: {
                    title: '用户管理',
                    icon: 'minus'
                }
            },
            {
                path: '/system/user-group-mange',
                name: 'userGroupMange',
                component: userGroupMange,
                meta: {
                    title: '用户组管理',
                    icon: 'minus'
                }
            },
            // {
            //     path: '/system/system-state',
            //     name: 'systemState',
            //     component: systemState,
            //     meta: {
            //         title: '系统状态',
            //         icon: 'minus'
            //     }
            // },

            // {
            //     path: '/system/warning-log',
            //     name: 'warningLog',
            //     component: warningLog,
            //     meta: {
            //         title: '告警日志',
            //         icon: 'minus'
            //     }
            // },
            // {
            //     path: '/system/warning-manage',
            //     name: 'warningManage',
            //     component: warningManage,
            //     meta: {
            //         title: '告警管理',
            //         icon: 'minus'
            //     }
            // },
        ]
    },

]

