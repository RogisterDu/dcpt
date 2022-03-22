export const taskColumns = [
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
    align: 'right',
    fixed: 'right',
    renderType: 'action',
    className: 'action-area',
    SLOT: 'actionRender',
  },
];

export const taskConfig = [
  {
    name: 'taskName',
    label: '任务名',
    itemType: 'Input',
    itemProps: {
      placeholder: '请输入任务名',
    },
  },
  {
    name: 'taskStatus',
    label: '任务状态',
    itemType: 'Select',
    itemProps: {
      placeholder: '请选择任务状态',
      options: [
        {
          label: '未完成',
          value: '0',
        },
        {
          label: '已完成',
          value: '1',
        },
      ],
    },
  },
  {
    label: '',
    name: 'occupiedItem1',
    placeholder: '',
  },
  {
    label: '',
    name: 'occupiedItem2',
    placeholder: '',
  },
];
