export const visitSearchConfig = [
  {
    name: 'name',
    label: '姓名',
    itemType: 'Input',
    itemProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    name: 'phone',
    label: '手机号',
    itemType: 'Input',
    itemProps: {
      placeholder: '请输入手机号',
    },
  },
  {
    name: 'visitTime',
    label: '来访时间',
    itemType: 'dateRange',
    itemProps: {
      placeholder1: '开始时间',
      placeholder2: '结束时间',
    },
  },
  {
    name: 'address',
    label: '居住地址',
    itemType: 'Input',
    itemProps: {
      placeholder: '请选择居住区域',
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

export const visitTableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: 'plainText',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    render: 'plainText',
  },
  {
    title: '体温',
    dataIndex: 'temperature',
    key: 'temperature',
    render: 'plainText',
  },
  {
    title: '来访时间',
    dataIndex: 'visitTime',
    key: 'visitTime',
    render: 'dateRange',
  },
  {
    title: '绿码',
    dataIndex: 'greenCode',
    key: 'greenCode',
  },
  {
    title: '是否接触过密切接触者',
    dataIndex: 'isContact',
    key: 'isContact',
  },
  {
    title: '是否去过高风险地区',
    dataIndex: 'isHighRisk',
    key: 'isHighRisk',
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