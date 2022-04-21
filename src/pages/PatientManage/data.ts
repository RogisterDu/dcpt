import { Area } from '@/utils/geographic/pca';


export const patientInfoItems = [
    {
        title: '基本信息',
        name: 'baseInfo',
        children: [
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
                name: 'sex',
                label: '性别',
                itemType: 'Select',
                rules: [
                    {
                        required: true,
                        message: '请选择性别',
                    },
                ],
                itemProps: {
                    placeholder: '请选择性别',
                    options: [
                        {
                            label: '男',
                            value: '0',
                        },
                        {
                            label: '女',
                            value: '1',
                        },
                    ]
                },
            },
            {
                name: 'identity_id',
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
                name: "tags",
                label: "病人标签",
                itemType: "Select",
                itemProps: {
                    placeholder: '请输入病人标签',
                    mode: "tags",
                },
            }

        ]
    },
    {
        title: "诊断信息",
        name: "patientInfo",
        children: [
            {
                name: 'history',
                label: '既往史',
                itemType: 'Input',
                itemProps: {
                    placeholder: '请输入既往史',
                },
            },
            {
                name: 'allergic',
                label: '过敏史',
                itemType: 'Input',
                itemProps: {
                    placeholder: '请输入过敏史',
                },
            },
            {
                name: 'habit',
                label: '洁牙习惯',
                itemType: 'Input',
                itemProps: {
                    placeholder: '请输入洁牙习惯',
                },
            },
        ]
    },
    {
        title: "其他联系方式",
        name: "otherConcact",
        children: [
            {
                name: 'qq',
                label: 'QQ',
                itemType: 'Input',
                itemProps: {
                    placeholder: '请输入qq',
                },
            },
            {
                name: 'email',
                label: '邮箱',
                itemType: 'Input',
                itemProps: {
                    placeholder: '请输入邮箱',
                },
            },
        ]
    }
];
