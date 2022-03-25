import React, { useState } from 'react';
import styles from './index.less';
import './coverAntd.less';
// import SearchForm from '@/pages/components/SearchForm';
import SearchForm from '@/pages/components/SearchForm';
import TableList from '@/pages/components/TableList';
import { visitSearchConfig, visitTableColumns, visitLogFormItems } from './data';
import { Button } from 'antd';
import AddModal from './components/AddModal';

const VisitLog: React.FC = () => {
  const [values, setValues] = useState({});
  const [selected, setSelected] = useState({});
  const [logModalVisable, setLogModalVisable] = useState(false);
  // const [visitId, setVisitId] = useState('');

  const toSbumitVisitLog = (Logvalues: any, hasId: any) => {
    console.log('Logvalues', Logvalues);
    console.log('hasId', hasId);
    setLogModalVisable(false);
  };

  const toSearch = (conditon: any) => {
    setValues({ ...conditon });
  };

  const toReset = () => {};

  const changeSelect = (selectedKeys: any[]) => {
    if (selectedKeys.length > 0) {
      console.log('改变选项', selectedKeys);
      setSelected({ ...selectedKeys });
    }
  };

  const toDelete = (id: any) => {
    console.log('删除', id);
  };

  const toAddNewLog = () => {
    console.log('新增新日志');
    setLogModalVisable(true);
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
      <SearchForm searchFormConfig={visitSearchConfig} resetForm={toReset} searchForm={toSearch} />
      <div className={styles.searchArea}>
        <div className={styles.actionArea}>
          <Button type="primary" onClick={toAddNewLog}>
            新增
          </Button>
          <Button type="primary" onClick={handletoExport}>
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
      <AddModal
        closable={true}
        centered
        mask
        destroyOnClose
        bodyStyle={{
          padding: '24px 42px 4px',
        }}
        className="s-modal"
        formItems={visitLogFormItems}
        title="新增日志"
        hasId={''}
        toSubmitForm={() => toSbumitVisitLog}
        visible={logModalVisable}
        onCancel={() => setLogModalVisable(false)}
      />
    </div>
  );
};

export default VisitLog;
