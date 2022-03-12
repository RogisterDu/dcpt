export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  {
    path: '/center',
    name: '门诊中心',
    icon: 'smile',
    routes: [
      { path: '/center', redirect: '/center/home' },
      { path: '/center/home', name: '首页', icon: 'smile', component: './Home' },
      { path: '/center/visitLog', name: '来访日志', icon: 'smile', component: './visitLog' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  // { path: '/', redirect: '/center/home' },
  // { component: './404' },
];
