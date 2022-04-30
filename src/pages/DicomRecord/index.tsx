import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, List, Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
import { queryDicomList } from '@/services/dicom';

type GithubIssueItem = {
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  time: string;
  url: any;
};

interface DicomRecordProps {
  patientId: string | number;
}

const DicomRecord: React.FC<DicomRecordProps> = ({ patientId }) => {
  const actionRef = useRef<ActionType>();
  const [showDicomModal, setShowDicomModal] = React.useState(false);
  const [dicomData, setDicomData] = useState<any>([]);

  const toViewDicom = (record: GithubIssueItem) => {
    console.log('查看dicom', record);
    setShowDicomModal(true);
    setDicomData(record.url);
  };

  useEffect(() => {
    actionRef.current?.reload();
  }, [patientId]);

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '拍摄时间',
      key: 'showTime',
      dataIndex: 'time',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_text, record) => [
        <a key="view" onClick={() => toViewDicom(record)}>
          查看
        </a>,
      ],
    },
  ];

  return (
    <>
      <Modal
        visible={showDicomModal}
        title="医学影像"
        width={1000}
        onCancel={() => setShowDicomModal(false)}
        footer={<Button onClick={() => setShowDicomModal(false)}>关闭</Button>}
        destroyOnClose
      >
        <div className={styles.dicomArea}>
          <List
            itemLayout="horizontal"
            grid={{ gutter: 8, column: 4 }}
            dataSource={dicomData}
            renderItem={(item: any) => (
              <List.Item key={item}>
                <Image
                  src={item}
                  key={item}
                  width={200}
                  placeholder={<Image preview={false} src={item} width={1600} key={item} />}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
      <div className={styles.tableArea}>
        医学影像
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter, params);
            const res = await queryDicomList({
              pageNo: params.current,
              pageSize: params.pageSize,
              patient_id: patientId,
            });
            return {
              data: res?.data?.data || [],
              success: true,
              total: res.data.total,
            };
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          headerTitle="高级表格"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
          ]}
        />
      </div>
    </>
  );
};
export default DicomRecord;
