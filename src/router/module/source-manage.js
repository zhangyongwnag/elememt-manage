const Main  = () => import("@/components/main")

//源管理相关路由
const DataBase = () => import('@/views/db-instance/db-instance')
const SourceDB = () => import('@/views/source/database/database')
const SourceFile = () => import('@/views/source/file/file')
const FileModal = () => import('@/views/source/file-template/file-template')
const DumpFile = () => import('@/views/source/dump/dump')

export default [
    {
        path:'/source',
        name:'SourceManage',
        component:Main,
        meta:{
            title:'源管理',
            icon: 'area-chart',
        },
        redirect: {
            name: 'DataBase'
        },
        children:[
            {
                path:'/source/db-instance',
                name:'DataBase',
                component:DataBase,
                meta:{
                    title:'数据库',
                    icon:'minus'
                }
            },
            {
                path:'/source/database',
                name:'SourceDB',
                component:SourceDB,
                meta:{
                    title:'数据库源',
                    icon:'minus'
                }
            },
            {
                path:'/source/file',
                name:'SourceFile',
                component:SourceFile,
                meta:{
                    title:'文件源',
                    icon:'minus'
                },
            },
            {
                path: '/source/file-template',
                name: 'FileModal',
                component: FileModal,
                meta: {
                    title: '文件模板',
                    icon: 'minus'
                }
            },
            {
                path:'/source/dump',
                name:'DumpFile',
                component:DumpFile,
                meta:{
                    title:'DMP源',
                    icon:'minus'
                }
            },
        ]
    }
]
