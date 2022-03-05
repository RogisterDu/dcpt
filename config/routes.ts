import { Redirect } from 'umi';

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
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
        path: '/center/home',
        name: '首页',
        icon: 'smile',
        component: './Home',
      },
      {
        path: '/center/visitLog',
        name: '来访日志',
        icon: 'smile',
        component: './visitLog',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/center/home',
  },
  {
    path: '/center',
    redirect: '/center/home',
  },
  {
    component: './404',
  },
];
