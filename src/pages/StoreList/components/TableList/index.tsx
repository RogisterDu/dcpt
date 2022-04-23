/*
 * @Author: your name
 * @Date: 2021-11-18 17:27:14
 * @LastEditTime: 2022-02-24 16:30:33
 * @LastEditors: jdchen
 * @FilePath: /crm/src/pages/task-manage/components/TableList/index.tsx
 */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'umi';
import { Table } from 'antd';
import moment from 'moment';
// import LogModalTable from '@/components/LogModal';
import type { columnsItem, recordInterface } from '../../layoutData';
import { tableColumns } from '../../layoutData';
import { queryTaskList, updateTaskStatus } from '@/services/task';
// import { downloadByUrl } from '@/utils/utils';
import style from '../../index.less';
import '../../coverAntd.less';

const initPaginationParams = {
  pageSize: 10,
  pageNo: 1,
};

const TableList: React.FC<{ values: any }> = ({ values }) => {
  // console.log('values111', values);
  const [paginationParams, setPage] = useState({ ...initPaginationParams }); //翻页参数
  const [total, setTotal] = useState(0); // 页码总数
  const [tableData, setTableData] = useState<any[]>([]); // 列表数据
  // const [CurrentPage, setCurrentPage] = useState({ ...initPaginationParams }); // 当前页码
  // const statusList = ['准备中', '待下载', '已下载'];
  const [loading, setLoading] = useState(false); // 列表加载状态

  const renderCircle = (status: number) => {
    switch (status) {
      case 100:
        return (
          <>
            <div className="table-circle color-ing" />
            准备中
          </>
        );
      case 200:
        return (
          <>
            <div className="table-circle color-ready" />
            待下载
          </>
        );
      case 300:
        return (
          <>
            <div className="table-circle color-done" />
            已下载
          </>
        );
      case 400:
        return (
          <>
            <div className="table-circle color-fail" />
            导出失败
          </>
        );
      default:
        return null;
    }
  };

  const getTableData = (pageInfo: any) => {
    setLoading(true);
    const { finished, taskStatus, taskType } = values;
    let finishTimeQueryStart;
    let finishTimeQueryEnd;
    if (finished) {
      // finishDatetimeStart = new Date(finished[0]).getTime();
      finishTimeQueryStart = moment(finished[0]).format('YYYY-MM-DD');
      finishTimeQueryEnd = moment(finished[1]).format('YYYY-MM-DD');
    }
    const params = {
      ...pageInfo,
      taskStatus,
      taskType,
      finishTimeQueryStart,
      finishTimeQueryEnd,
    };
    queryTaskList(params).then((res) => {
      setTableData(res?.data?.data || []);
      setTotal(res?.data?.total || 0);
      setLoading(false);
    });
  };

  const handleToDownload = (record: recordInterface) => {
    console.log('download', record);
    window.open(record.fileUrl);
    // downloadByUrl(record.fileUrl, '');
    if (record.taskStatus) {
      // console.log('updateTaskStatus', record);
      const params = {
        taskId: record.id,
      };
      updateTaskStatus(params).then((res) => {
        if (res.code) {
          console.log('更新成功', paginationParams);
          getTableData(paginationParams);
          // getTableData(CurrentPage);
        }
      });
    }
  };

  useEffect(() => {
    setPage({ pageNo: 1, pageSize: paginationParams.pageSize });
    getTableData({ pageNo: 1, pageSize: paginationParams.pageSize });
  }, [values]);
  // 渲染列表项
  const renderColumnsTitle = (
    recordInfo: { value: any; record: any },
    itemRenderType: columnsItem,
  ) => {
    const { value, record } = recordInfo;
    const { taskStatus } = record;
    switch (itemRenderType.renderType) {
      case 'plainText':
        return value || '-';
      case 'dateTime':
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-';
      case 'statusRender':
        return (
          <>
            <div className="table-status">{renderCircle(taskStatus)}</div>
          </>
        );
      case 'action':
        return record.taskStatus !== 100 && record.taskStatus !== 400 ? (
          <>
            <a onClick={() => handleToDownload(record)}>下载</a>
          </>
        ) : (
          <>
            <p className={`${style.disabledDownload}`}>下载</p>
          </>
        );
      default:
        return value;
    }
  };

  return (
    <React.Fragment>
      <Table
        loading={loading}
        className={`${style.commontTable} product-table common-table`}
        rowKey="id"
        dataSource={tableData}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
        pagination={{
          current: paginationParams.pageNo,
          pageSize: paginationParams.pageSize,
          hideOnSinglePage: false,
          total,
          showSizeChanger: true,
          showTotal: (all) => `共${all}条`,
          responsive: false,
          onChange: (pageNo, pageSize) => {
            console.log('页码改变', pageNo, pageSize);
            setPage({ pageNo, pageSize });
            // setCurrentPage({ pageNo, pageSize });
            getTableData({ pageNo, pageSize });
          },
        }}

        // rowSelection={rowSelection}
      >
        {tableColumns.map((item: columnsItem) => {
          return (
            <Table.Column
              {...item}
              render={(text, record) => {
                const recordInfo = { value: text, record };
                return renderColumnsTitle(recordInfo, item);
              }}
            />
          );
        })}
      </Table>
    </React.Fragment>
  );
};

export default TableList;
