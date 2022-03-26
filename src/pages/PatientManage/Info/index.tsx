import React from 'react';
import FormDetail from '@/pages/components/FormDetail';
import { Avatar, Rate } from 'antd';
import styles from '../index.less';

interface Iprops {
  patientInfo: any;
}
const Info: React.FC<Iprops> = ({ patientInfo }) => {
  const dataConfig = [
    {
      title: '基本信息',
      key: 'baseInfo',
      children: [
        {
          label: '姓名',
          defaultValue: patientInfo?.name || '-',
          key: 'orderNo',
        },
        {
          label: '性别',
          defaultValue: patientInfo?.sex || '-',
          key: 'sex',
        },
        {
          label: '出生年月',
          defaultValue: patientInfo?.birthday || '-',
          key: 'birthday',
        },
        {
          label: '手  机',
          defaultValue: patientInfo?.phone || '-',
          key: 'phone',
        },
        {
          label: 'QQ',
          defaultValue: patientInfo?.qq || '-',
          key: 'qq',
        },
        {
          label: 'Email',
          defaultValue: patientInfo?.email || '-',
          key: 'email',
        },
        {
          label: '最近就诊时间',
          defaultValue: patientInfo?.visitLast || '-',
          key: 'visitLast',
        },
        {
          label: '创建者',
          defaultValue: patientInfo?.creator || '-',
          key: 'creator',
        },
      ],
    },
    {
      title: '家庭信息',
      key: 'homeInfo',
      children: [
        {
          label: '家庭住址',
          defaultValue: patientInfo?.home || '-',
          key: 'orderNo',
        },
      ],
    },
    {
      title: '全身检查',
      key: 'check',
      children: [
        {
          label: '既 往 史',
          defaultValue: patientInfo?.pastHistory || '-',
          key: 'pastHistory',
        },
        {
          label: '过 敏 史',
          defaultValue: patientInfo?.allergyHistory || '-',
          key: 'allergyHistory',
        },
        {
          label: '流行病学史',
          defaultValue: patientInfo?.histlogicalHistoryory || '-',
          key: 'logicalHistory',
        },
        {
          label: '洁牙习惯',
          defaultValue: patientInfo?.habits || '-',
          key: 'habits',
        },
      ],
    },
  ];
  return (
    <>
      <div className={styles.avatarArea}>
        <Avatar size={128} />
        <div className={styles.patientrate}>
          <div className={styles.rateArea}>
            <span>客户星级 ： </span>
            <Rate disabled defaultValue={patientInfo?.rate || 0} />
          </div>
          <div className={styles.rateArea}>
            <span>客户标签 ： </span>
          </div>
        </div>
      </div>
      <FormDetail dataConfig={dataConfig} />
    </>
  );
};

export default Info;