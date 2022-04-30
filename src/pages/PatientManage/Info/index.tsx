import React, { useEffect, useState } from 'react';
import FormDetail from '@/pages/components/FormDetail';
import { Avatar, Rate, Tag } from 'antd';
import styles from '../index.less';
import { queryPatientDetails } from '@/services/patient';

interface Iprops {
  patientId: any;
  handleToEdit: any;
}
const Info: React.FC<Iprops> = ({ patientId, handleToEdit }) => {
  const [patientInfo, setPatientInfo] = useState<any>({});

  useEffect(() => {
    console.log('info', patientId);
    if (patientId) {
      queryPatientDetails({ patientId }).then((res) => {
        setPatientInfo(res.data || {});
        console.log(res.data);
      });
    } else {
      setPatientInfo({});
    }
  }, [patientId]);
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
          defaultValue: ['男', '女'][patientInfo?.sex] || '-',
          key: 'sex',
        },
        {
          label: '出生年月日',
          defaultValue: patientInfo?.birth || '-',
          key: 'birthday',
        },
        {
          label: '手  机',
          defaultValue: patientInfo?.contact || '-',
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
          defaultValue: patientInfo?.last_visit || '-',
          key: 'visitLast',
        },
      ],
    },
    {
      title: '家庭信息',
      key: 'homeInfo',
      children: [
        {
          label: '家庭住址',
          defaultValue: `${patientInfo?.PCR?.join(' ') || '-'}  ${patientInfo?.address || '-'}`,
          key: 'home',
        },
      ],
    },
    {
      title: '全身检查',
      key: 'check',
      children: [
        {
          label: '既 往 史',
          defaultValue: patientInfo?.history || '-',
          key: 'pastHistory',
        },
        {
          label: '过 敏 史',
          defaultValue: patientInfo?.allergic || '-',
          key: 'allergyHistory',
        },
        {
          label: '洁牙习惯',
          defaultValue: patientInfo?.habit || '-',
          key: 'habit',
        },
      ],
    },
  ];

  const toEditInfo = () => {
    handleToEdit(patientInfo);
  };
  return (
    <>
      <div className={styles.avatarArea}>
        <Avatar size={128} src={patientInfo?.Avatar || 'https://joeschmoe.io/api/v1/random'} />
        <div className={styles.patientrate}>
          <div className={styles.rateArea}>
            <span>客户星级 ： </span>
            <Rate disabled defaultValue={patientInfo?.rate || 0} />
          </div>
          <div className={styles.rateArea}>
            <span>
              客户标签 ：
              {patientInfo?.tags?.map((tag: any) => {
                return (
                  <Tag color="#55acee" key={tag}>
                    {tag}
                  </Tag>
                );
              }) || null}
            </span>
          </div>
          <div className={styles.rateArea}>
            <a onClick={toEditInfo}>修改信息</a>
          </div>
        </div>
      </div>
      <FormDetail dataConfig={dataConfig} />
    </>
  );
};

export default Info;
