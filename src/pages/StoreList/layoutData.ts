export const searchFormConfig = [
  // {
  //   label: '任务名：',
  //   name: 'taskType',
  //   itemType: 'select',
  //   itemProps: {
  //     // showSearch: true,
  //     placeholder: '请选择任务名',
  //     options: [
  //       {
  //         label: '订单导出',
  //         value: '100',
  //       },
  //       // {
  //       //   label: '产品导出',
  //       //   value: '300',
  //       // },
  //       {
  //         label: '账号导出',
  //         value: '400',
  //       },
  //     ],
  //   },
  // },
  {
    label: '完成时间：',
    name: 'finished',
    itemType: 'dateRange',
    itemProps: {
      placeholder1: '开始时间',
      placeholder2: '结束时间',
    },
  },
  {
    label: '状态：',
    name: 'taskStatus',
    itemType: 'select',
    itemProps: {
      placeholder: '请选择状态',
      options: [
        {
          value: 100,
          label: '准备中',
        },
        {
          value: 200,
          label: '待下载',
        },
        {
          value: 300,
          label: '已下载',
        },
        {
          value: 900,
          label: '导出失败',
        },
      ],
    },
  },
];
export const tableColumns = [
  {
    title: '任务名',
    dataIndex: 'taskName',
    key: 'taskName',
    renderType: 'plainText',
  },
  {
    title: '完成时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    renderType: 'dateTime',
  },
  {
    title: '状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    renderType: 'statusRender',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    renderType: 'plainText',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    renderType: 'action',
    className: 'action-area',
  },
];

export interface columnsItem {
  title: string;
  dataIndex: string;
  key: string;
  renderType?: string;
}

export interface recordInterface {
  taskName: string;
  finishDatetime: string;
  taskStatus: number;
  taskStatusDesc: string;
  ifCanDownLoad: boolean;
  fileUrl: string;
  id: string;
}
