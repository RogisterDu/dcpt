import React, { useState } from 'react';
import styles from './index.less';
import SearchForm from '@/pages/components/SearchForm';
import TableList from '@/pages/components/TableList';
import { visitSearchConfig, visitTableColumns } from './data';
import { Button } from 'antd';

const VisitLog: React.FC = () => {
  const [values, setValues] = useState({});

  const toSearch = () => {
    setValues({ ...values });
  };

  const toReset = () => {};

  const changeSelect = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <SearchForm searchFormConfig={visitSearchConfig} ResetForm={toReset} toSearch={toSearch} />
      <div className={styles.searchArea}>
        <div className={styles.actionArea}>
          <Button type="primary">导出</Button>
        </div>
        <div className={styles.tableArea}>
          <TableList
            values={values}
            tableColumns={visitTableColumns}
            api={'/dcpt/visitList'}
            rowSelection={() => changeSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitLog;
