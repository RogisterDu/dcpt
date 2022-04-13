import { Area } from '@/utils/geographic/pca';
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
    renderType: 'plainText',
  },
  {
    title: '手机号',
    dataIndex: 'contact',
    key: 'contact',
    renderType: 'plainText',
  },
  {
    title: '身份证',
    dataIndex: 'identityID',
    key: 'identityID',
    SLOT: 'identityIdRender',
  },
  {
    title: '体温',
    dataIndex: 'temperature',
    key: 'temperature',
    renderType: 'plainText',
  },
  {
    title: '来访时间',
    dataIndex: 'time',
    key: 'time',
    renderType: 'dateRange',
  },
  {
    title: '健康码',
    dataIndex: 'greenCode',
    key: 'greenCode',
    SLOT: 'greenCodeRender',
  },
  {
    title: '是否接触过密切接触者',
    dataIndex: 'is_touch',
    key: 'is_touch',
    renderType: 'boolean',
  },
  {
    title: '是否去过高风险地区',
    dataIndex: 'is_safe',
    key: 'is_safe',
    renderType: 'boolean',
  },
  {
    title: '居住住址',
    SLOT: 'addressRender',
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
    name: 'identityID',
    label: '身份证号',
    itemType: 'Input',
    itemProps: {
      placeholder: '请输入身份证号',
    },
    rules: [
      {
        required: true,
        message: '请输入身份证号',
      },
      {
        whitespace: true,
        message: '身份证号不能为空',
      },
      {
        pattern:
          /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: '请输入正确的身份证号',
      },
    ],
  },
  {
    name: 'contact',
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
    name: 'PCR',
    label: '省市区',
    itemType: 'Cascader',
    rules: [
      {
        required: true,
        message: '请选择省市区',
      },
    ],
    itemProps: {
      placeholder: '请选择省市区',
      options: [...Area],
      // fieldNames: {
      //   label: 'label',
      //   value: {
      //     'value': 'value',
      //     'label': 'label',
      //   },
      //   children: 'children',
      // },
    },
  },
  {
    name: 'address',
    label: '居住地址',
    itemType: 'Input',
    rules: [
      {
        required: true,
        message: '请输入居住地址',
      },
    ],
    itemProps: {
      placeholder: '请输入居住地址',
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
          label: '绿码',
          value: '0',
        },
        {
          label: '黄码',
          value: '1',
        },
        {
          label: '红码',
          value: '2',
        },
      ],
    },
  },
  {
    name: 'is_touch',
    label: '是否接触过密切接触者',
    rules: [
      {
        required: true,
        message: '请选择是否接触过密切接触者',
      },
    ],
    itemType: 'Select',
    itemProps: {
      placeholder: '请选择是否接触过密切接触者',
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
  {
    name: 'is_safe',
    label: '是否去过高风险地区',
    rules: [
      {
        required: true,
        message: '是否去过高风险地区',
      },
    ],
    itemType: 'Select',
    itemProps: {
      placeholder: '请选择是否去过高风险地区',
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
