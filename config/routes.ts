import { StarOutlined, BarChartOutlined, SolutionOutlined, ScheduleOutlined } from '@ant-design/icons';
export default [
  {
    path: '/',
    redirect: '/center/home',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/center',
    name: '门诊中心',
    icon: 'smile',
    routes: [
      {
        path: '/center',
        redirect: '/center/home',
      },
      {
        path: '/center/home',
        name: '首页',
        icon: 'BarChartOutlined',
        component: './DashboardAnalysis',
      },
      {
        path: '/center/visitLog',
        name: '来访日志',
        icon: 'BookOutlined',
        component: './VisitLog',
      },
      {
        path: '/center/patient',
        name: '病人列表',
        icon: 'ScheduleOutlined',
        component: './PatientManage', // routes: [{
        //   path: '/center/patientInfo',
        //   name: '病人信息',
        //   component: './PatientManage/Info/[id$].tsx',
        // }]
      },
      {
        path: '/center/reservation',
        name: '预约管理',
        icon: 'smile',
        component: './Reservation',
      },
      {
        path: '/center/exportTask',
        name: '导出任务',
        icon: 'smile',
        component: './StoreList',
      },
      {
        name: '个人设置',
        icon: 'smile',
        path: '/center/accountsettings',
        component: './AccountSettings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/chargeManage',
      },
      {
        path: '/admin/chargeManage',
        name: '收费管理',
        icon: 'smile',
        component: './ChargeManage',
      },
      {
        path: '/admin/accountManage',
        name: '账户管理',
        icon: 'smile',
        component: './AccountManage',
      },
      // {
      //   path: '/admin/sub-page',
      //   name: '二级管理页',
      //   icon: 'smile',
      //   component: './Welcome',
      // },

      {
        component: './404',
      },
    ],
  },
];
