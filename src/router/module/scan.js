const Main = () => import("@/components/main")
const ScanList = () => import("@/views/scan/index")
const InformationCarding = () => import("@/views/scan/info-mation-carding")

export default [
    {
        path: '/Scan',
        name: 'scan',
        component: Main,
        meta: {
            title: '数据扫描',
            icon: 'paste'
        },
        redirect: {
            name: 'ScanList'
        },
        children: [
            {
                path: '/scan/Index',
                name: 'ScanList',
                component: ScanList,
                meta: {
                    title: '扫描任务',
                    icon: 'minus'
                }
            },
            {
                path: '/scan/info-carding',
                name: 'InformationCarding',
                component: InformationCarding,
                meta: {
                    title: '敏感信息梳理',
                    icon: 'minus'
                }
            }
        ]
    }
]
