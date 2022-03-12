/*
 * @Author: yquanmei
 * @Date: 2022-01-11 11:07:19
 * @Last Modified by: yquanmei
 * @Last Modified time: 2022-02-11 14:13:25
 */
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import request from '@/utils/request';
import { COMMON_DEFAULT_PAGENO, COMMON_DEFAULT_PAGESIZE } from '@/utils/common';

export interface Iprops {
  values: any;
  tableColumns: any[];
  api: string;
  rowSelection?: any;
}

const TableList: React.FC<Iprops> = (props) => {
  const { values, tableColumns, api, rowSelection } = props;
  const [tableData, setTableData] = useState<any[]>([]); // 列表数据
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  // func：请求table数据
  const getTableData = (pageInfo?: any) => {
    const pageNo = pageInfo?.pageNo || COMMON_DEFAULT_PAGENO;
    const pageSize = pageInfo?.pageSize || COMMON_DEFAULT_PAGESIZE;

    request(api, {
      method: 'GET',
      params: {
        ...values,
        pageNo,
        pageSize,
      },
    }).then((res) => {
      // 需要将数据处理成需要的格式
      const data = res?.data?.dataList || [];
      if (Array.isArray(data)) {
        const totalPage = res?.data?.total || 0;
        setTotal(totalPage);
        setTableData(data);
      }
    });
  };

  // func：改变选择的keys数据：当前组件状态改变，数据传给父组件
  const changeSelectedRow = (keys: any[]) => {
    setSelectedRowKeys(keys);
    if (rowSelection && typeof rowSelection === 'function') {
      rowSelection(keys);
    }
  };

  // func：表格数据
  const tableRowSelection = () => {
    if (rowSelection) {
      return {
        preserveSelectedRowKeys: true,
        selectedRowKeys,
        fixed: true,
        onChange: (selectedKeys: any[]) => {
          changeSelectedRow(selectedKeys);
        },
      };
    }
    return undefined;
  };

  // render:渲染列表项
  const renderColumnsTitle = (recordInfo: any, item: any) => {
    const { value, record } = recordInfo;
    if (item.SLOT) {
      return props[item.SLOT](record);
    }
    switch (item.renderType) {
      case 'dateTime':
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-';
      default:
        return value || '-';
    }
  };

  // 获取列表数据
  useEffect(() => {
    setCurrentPageNo(COMMON_DEFAULT_PAGENO);
    changeSelectedRow([]);
    getTableData();
  }, [values]);

  return (
    <>
      <Table
        className={`product-table common-table`}
        rowKey={(record) => record.id}
        columns={tableColumns.map((item) => {
          return {
            ...item,
            render: (text, record) => {
              const recordInfo = { value: text, record };
              return renderColumnsTitle(recordInfo, item);
            },
          };
        })}
        dataSource={tableData}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
        pagination={{
          total,
          showTotal: (totalPage) => <div>共{totalPage}条</div>,
          // hideOnSinglePage: false,
          showSizeChanger: true,
          responsive: false,
          current: currentPageNo,
          defaultPageSize: COMMON_DEFAULT_PAGESIZE,
          defaultCurrent: COMMON_DEFAULT_PAGENO,
          onChange: (page, pageSize) => {
            setCurrentPageNo(page);
            getTableData({
              pageNo: page,
              pageSize,
            });
          },
        }}
        rowSelection={tableRowSelection()}
      />
    </>
  );
};

export default TableList;
