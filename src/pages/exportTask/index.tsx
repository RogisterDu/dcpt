import React, { useState } from 'react';
import styles from './index.less';
import SearchForm from '@/pages/components/SearchForm';
import TableList from '@/pages/components/TableList';
import { taskConfig, taskColumns } from './data';

const ExportTask: React.FC = () => {
  const [values, setValues] = useState({});

  const toSearch = (conditon: any) => {
    setValues({ ...conditon });
  };

  const toReset = () => {};

  const handleToDownload = (record: any) => {
    console.log(record);
  };

  // func: 表格数据处理
  const tableRenders = {
    actionRender: (record: any) => {
      return record.taskStatus !== 100 && record.taskStatus !== 900 ? (
        <>
          <a onClick={() => handleToDownload(record)}>下载</a>
        </>
      ) : (
        <>
          <p className={`${styles.disabledDownload}`}>下载</p>
        </>
      );
    },
  };

  return (
    <div>
      <SearchForm searchFormConfig={taskConfig} ResetForm={toReset} toSearch={toSearch} />
      <div className={styles.searchArea}>
        <div className={styles.tableArea}>
          <TableList
            values={values}
            tableColumns={taskColumns}
            api={'/dcpt/visitList'}
            {...tableRenders}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportTask;
