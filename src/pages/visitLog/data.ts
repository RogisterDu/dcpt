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

export const visitLogFormItems = [
  {
    name: 'name',
    label: '姓名',
    itemType: 'Input',
    rules: [
      {
        required: true,
        message: '请输入姓名',
      },
      {
        whitespace: true,
        message: '姓名不能为空',
      },
    ],
    itemProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    name: 'phone',
    label: '手机号',
    itemType: 'Input',
    rules: [
      {
        required: true,
        message: '请输入手机号',
      },
      {
        pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
        message: '手机号格式有误',
      },
    ],
    itemProps: {
      placeholder: '请输入手机号',
    },
  },
  {
    name: 'temperature',
    label: '体温',
    itemType: 'Number',
    rules: [
      {
        required: true,
        message: '请输入体温',
      },
    ],
    itemProps: {
      placeholder: '请输入体温',
      min: 0,
    },
  },
  {
    name: 'greenCode',
    label: '健康码',
    rules: [
      {
        required: true,
        message: '请选择健康码状态',
      },
    ],
    itemType: 'Select',
    itemProps: {
      placeholder: '请选择健康码状态',
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '0',
        },
      ],
    },
  },
];
