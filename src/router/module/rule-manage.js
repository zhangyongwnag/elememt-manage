const Main = () => import('@/components/main')

//扫描与脱敏设置
const DataDic = () => import('@/views/rule-manage/data-dic/data-dic')
const DesenAlgorithm = () => import('@/views/rule-manage/desen-algo/desen-algo')
const ScanRule = () => import('@/views/rule-manage/scan-rule/scan-rule')

export default [
    {
        path: '/rule-manage',
        name: '/rule-manage',
        component: Main,
        meta: {
            icon: 'gears',
            title: '扫描与脱敏配置'
        },
        redirect: {
            name: 'DataDic'
        },
        children: [
            {
                path: '/rule-manage/data-dic',
                name: 'DataDic',
                component: DataDic,
                meta: {
                    icon: 'minus',
                    title: '数据字典'
                }
            },
            {
                path: '/rule-manage/scan-rule',
                name: 'ScanRule',
                component: ScanRule,
                meta: {
                    icon: 'minus',
                    title: '扫描规则'
                }
            },
            {
                path: '/rule-manage/desen-algo',
                name: 'DesenAlgorithm',
                component: DesenAlgorithm,
                meta: {
                    icon: 'minus',
                    title: '脱敏算法'
                }
            },
        ]
    }
]
