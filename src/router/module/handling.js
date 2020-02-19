const Main  = () => import("@/components/main")
const DataCollection  = () => import("@/views/data-handling/data-collection.vue")
const ProgramManage  = () => import("@/views/data-handling/program-manage")
const HandlingTask  = () => import("@/views/data-handling/handling-task")

export default [
  {
    path:'/Handling',
    name:'Handling',
    component:Main,
    meta:{
      title:'数据脱敏',
      icon:'low-vision'
    },
    redirect: {
      name:'DataCollection'
    },
    children:[
      {
        path:'/handling/data-collection',
        name:'DataCollection',
        component:DataCollection,
        meta:{
          title:'数据子集',
          icon:'minus'
        },
      },
      {
        path:'/handling/program-manage',
        name:'ProgramManage',
        component:ProgramManage,
        meta:{
          title:'方案管理',
          icon:'minus'
        },
      },
      {
        path:'/handling/handling-task',
        name:'HandlingTask',
        component:HandlingTask,
        meta:{
          title:'脱敏任务',
          icon:'minus'
        },
      },
    ]
  }
]
