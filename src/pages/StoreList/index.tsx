import React, { useState } from 'react';
// import SearchForm from './components/SearchForm';
import SearchForm from '@/pages/components/SearchForm';
import TableList from './components/TableList';
import { searchFormConfig } from './layoutData';
import styles from './index.less';

const StoreList: React.FC = () => {
  const [values, setFormValues] = useState<any>({});
  const resetForm = (item?: any) => {
    console.log(item);
    setFormValues({});
  };
  const searchForm = (nowValues: any) => {
    const tmpVal = { ...nowValues };
    setFormValues({ ...tmpVal });
    console.log('2222', tmpVal);
  };

  return (
    <div>
      <SearchForm
        searchFormConfig={searchFormConfig}
        resetForm={resetForm}
        searchForm={searchForm}
      />
      <div className={styles.categoryContent}>
        <div className={styles.categoryBlock}>
          <TableList values={values} />
        </div>
      </div>
    </div>
  );
};
export default StoreList;
