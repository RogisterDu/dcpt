/*
 * @Description:
 * @Author: jdchen
 * @Date: 2021-11-25 14:46:07
 * @LastEditors: jdchen
 * @LastEditTime: 2022-02-24 09:47:23
 */
import React, { useCallback, useState } from 'react';
import { Button, Input, Form, Select, DatePicker } from 'antd';
import styles from './Search.less';
import './coverAntd.less';

interface searchProps {
  label: string;
  name: string;
  itemType: string;
  itemProps: Record<string, string | number | boolean>;
  // searchInfo?: { api: string; paramsName?: string; label?: string; value?: string };
}

const SearchForm: React.FC<{ searchFormConfig: any[]; ResetForm: any; toSearch: any }> = ({
  searchFormConfig,
  ResetForm,
  toSearch,
}) => {
  const { RangePicker } = DatePicker;
  const [orderSearchForm] = Form.useForm(); // 定义表单实例
  const [collapsedStatus, setCollapsedStatus] = useState(true); // 展开收起的状态
  const changeCollapsedStatus = useCallback(() => {
    setCollapsedStatus(!collapsedStatus);
  }, [collapsedStatus]);
  const toResetForm = useCallback(() => {
    orderSearchForm.resetFields();
    ResetForm();
  }, [ResetForm, orderSearchForm]);

  const onClick_Search = useCallback(() => {
    const { makeOrder, ...rest } = orderSearchForm.getFieldsValue();
    if (makeOrder) {
      rest.makeOrderAtStart = makeOrder[0].format('YYYY-MM-DD');
      rest.makeOrderAtEnd = makeOrder[1].format('YYYY-MM-DD');
    }
    toSearch(rest);
  }, [toSearch, orderSearchForm]);
  // 渲染查询表单的表单项
  const renderFormItem = (itemConfig: searchProps): React.ReactNode => {
    switch (itemConfig.itemType) {
      case 'select':
        return (
          <Form.Item
            className={styles.formItem}
            label={itemConfig.label}
            name={itemConfig.name}
            key={itemConfig.name}
          >
            <Select
              {...itemConfig.itemProps}
              className="common-multiple-select"
              key={itemConfig.name}
            />
          </Form.Item>
        );
      case 'dateRange': //下单时间
        return (
          <Form.Item
            className={styles.formItem}
            label={itemConfig.label}
            name={itemConfig.name}
            key={itemConfig.name}
          >
            <RangePicker
              placeholder={[
                itemConfig.itemProps.placeholder1 as string,
                itemConfig.itemProps.placeholder2 as string,
              ]}
              allowEmpty={[false, false]}
              separator={<span>~</span>}
              className="common-date-select"
              dropdownClassName="common-date-drop"
              key={itemConfig.name}
            />
          </Form.Item>
        );
      //撑开宽度
      case 'occupiedItem1':
      case 'occupiedItem2':
        return <div />;
      default:
        return (
          <Form.Item
            className={styles.formItem}
            label={itemConfig.label}
            name={itemConfig.name}
            key={itemConfig.name}
            getValueFromEvent={(e) => e.target.value.trim()}
          >
            <Input {...(itemConfig?.itemProps || {})} key={itemConfig.name} />
          </Form.Item>
        );
    }
  };
  return (
    <div
      className={
        !collapsedStatus
          ? `${styles.listSearchWrapper} list-search-cover-antd ${styles.listSearchFromUp} list-search-cover-antd`
          : `${styles.listSearchWrapper} list-search-cover-antd ${styles.listSearchFormDown}`
      }
    >
      <Form
        className={styles.formWrapper}
        name="orderSearchForm"
        autoComplete="off"
        form={orderSearchForm}
      >
        {(searchFormConfig as searchProps[]).map((item) => {
          if (item.name.includes('occupiedItem')) {
            // 空的填充元素
            return <div className={`${styles.formItem} ${styles.emptyFormItem}`} key={item.name} />;
          }
          return <>{renderFormItem(item)}</>;
        })}
      </Form>
      <div className={styles.searchBtnArea}>
        <Button
          key="to-search"
          type="primary"
          onClick={onClick_Search}
          className={`${styles.btnCommon} ${styles.toSearch}`}
        >
          查询
        </Button>
        <Button
          key="to-reset"
          type="default"
          onClick={toResetForm}
          className={`${styles.btnCommon} ${styles.toReset}`}
        >
          重置
        </Button>
        <a className="handleCollapsed" onClick={changeCollapsedStatus} key="to-handle">
          <span style={{ marginRight: '4px' }}>{collapsedStatus ? '展开' : '收起'}</span>
        </a>
      </div>
    </div>
  );
};

export default SearchForm;
