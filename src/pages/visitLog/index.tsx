import React, { useState } from 'react';
import styles from './index.less';
import './coverAntd.less';
// import SearchForm from '@/pages/components/SearchForm';
import SearchForm from '@/pages/components/SearchForm';
import TableList from '@/pages/components/TableList';
import { visitSearchConfig, visitTableColumns, visitLogFormItems } from './data';
import { Button, Divider, message, Tooltip } from 'antd';
import AddModal from './components/AddModal';
import { addNewVisitLog, exportVisitLog, invaildVisitLog } from '@/services/visit';
import moment from 'moment';
import { addNewPatient } from '@/services/patient';

const VisitLog: React.FC = () => {
  const [values, setValues] = useState({});
  const [selected, setSelected] = useState({});
  const [logModalVisable, setLogModalVisable] = useState(false);
  const [formrefresh, setFormrefresh] = useState(0);
  // const [visitId, setVisitId] = useState('');

  const toSubmitVisitLog = (Logvalues: any, hasId: any) => {
    console.log('Logvalues', Logvalues);
    console.log('hasId', hasId);

    addNewVisitLog({ ...Logvalues }).then((res) => {
      if (res.code) {
        setLogModalVisable(false);
        setFormrefresh(Date.now());
      }
    });
  };

  const toSearch = (conditon: any) => {
    const { visitTime, ...rest } = conditon;
    if (visitTime && visitTime.length > 0) {
      rest.visitTimeStart = moment(visitTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      rest.visitTimeEnd = moment(visitTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    setValues({ ...rest });
  };

  const toReset = () => {
    setValues({});
  };

  const changeSelect = (selectedKeys: any[]) => {
    if (selectedKeys.length > 0) {
      console.log('改变选项', selectedKeys);
      setSelected({ ...selectedKeys });
    }
  };

  const toSeeDoctor = (record: any) => {
    console.log('查看医生', record);
    const params = {
      name: record.name,
      identity_id: record.identityID,
      sex: record.sex || 0,
      contact: record.contact,
      PCR: record.pcr,
      address: record.address,
    };
    addNewPatient(params).then((res: any) => {
      if (res.code) {
        message.success(res.message || '添加成功');
        console.log(res?.data?.id || 0);
      }
    });
  };

  const toInvalid = (id: any) => {
    console.log('删除', id);
    invaildVisitLog({ id }).then((res) => {
      if (res.code) {
        setFormrefresh(Date.now());
      }
      message.success(res.message || '作废成功');
    });
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
          <a onClick={() => toSeeDoctor(record)}>就诊</a>
          <Divider type="vertical" />
          <a onClick={() => toInvalid(id)}>作废</a>
        </>
      );
    },
    greenCodeRender: (record: any) => {
      console.log('record', record);
      const codeStatus = ['绿码', '红码', '黄码'];
      return codeStatus[record.greenCode];
    },
    identityIdRender: (record: any) => {
      const { identityID } = record;
      return (
        <Tooltip title={identityID} placement="topLeft">
          <div>{identityID.slice(0, 7)}*********</div>
        </Tooltip>
      );
    },
    addressRender: (record: any) => {
      const { address, pcr } = record;
      const pcr_str = pcr?.join('-') || '';
      return (
        <Tooltip title={`${pcr_str}${address}`} placement="topLeft">
          <div>
            {pcr_str}
            {address.slice(0, 5)}******
          </div>
        </Tooltip>
      );
    },
  };

  const handletoExport = () => {
    console.log(selected);
    exportVisitLog({}).then((res) => {
      if (res.code) {
        message.success('已添加到导出队列');
      }
    });
  };

  return (
    <div>
      <SearchForm
        searchFormConfig={visitSearchConfig}
        resetForm={toReset}
        searchForm={toSearch}
        formrefresh={formrefresh}
      />
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
            api={'/api/visitor/query/paging'}
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
        toSubmitForm={toSubmitVisitLog}
        visible={logModalVisable}
        onCancel={() => setLogModalVisable(false)}
      />
    </div>
  );
};

export default VisitLog;
