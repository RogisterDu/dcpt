import React, { useState } from 'react';
import styles from './index.less';
import SearchForm from '@/pages/components/SearchForm';
import TableList from '@/pages/components/TableList';
import { visitSearchConfig, visitTableColumns } from './data';
import { Button } from 'antd';

const VisitLog: React.FC = () => {
  const [values, setValues] = useState({});
  const [selected, setSelected] = useState({});

  const toSearch = (conditon: any) => {
    setValues({ ...conditon });
  };

  const toReset = () => {};

  const changeSelect = (selectedKeys: any[]) => {
    console.log(selectedKeys);
    setSelected({ ...selectedKeys });
  };

  const toDelete = (id) => {
    console.log(id);
  };

  // func: 表格数据处理
  const tableRenders = {
    actionRender: (record: any) => {
      const { id } = record;
      // console.log(record);
      return (
        <>
          <a onClick={() => toDelete(id)}>新增为病人</a>
          <a onClick={() => toDelete(id)}>作废</a>
        </>
      );
    },
  };

  const handletoExport = () => {
    console.log(selected);
  };

  return (
    <div>
      <SearchForm searchFormConfig={visitSearchConfig} ResetForm={toReset} toSearch={toSearch} />
      <div className={styles.searchArea}>
        <div className={styles.actionArea}>
          <Button type="primary" onClick={() => handletoExport}>
            新增
          </Button>
          <Button type="primary" onClick={() => handletoExport}>
            导出
          </Button>
        </div>
        <div className={styles.tableArea}>
          <TableList
            values={values}
            tableColumns={visitTableColumns}
            api={'/dcpt/visitList'}
            rowSelection={changeSelect}
            {...tableRenders}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitLog;
