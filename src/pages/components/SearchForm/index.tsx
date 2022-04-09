/*
 * @Description:
 * @Author: jdchen
 * @Date: 2021-11-25 14:46:07
 * @LastEditors: jdchen
 * @LastEditTime: 2021-11-25 18:48:44
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import styles from './index.less';
import './coverAntd.less';

const { RangePicker } = DatePicker;

const SearchForm: React.FC<{
  searchFormConfig: any[];
  resetForm: any;
  searchForm: any;
  formrefresh: any;
}> = ({ searchFormConfig, resetForm, searchForm, formrefresh }) => {
  const [TotalSearchForm] = Form.useForm(); // 定义表单实例
  // const [values, setFormValues] = useState({})
  const [collapsedStatus, setCollapsedStatus] = useState(true);
  const [showSearchCollaps, setShowSearchCollaps] = useState<boolean>(false);
  // console.log(props)
  // 渲染查询表单的表单项
  const renderFormItem = (itemConfig: any) => {
    switch (itemConfig.itemType) {
      case 'Input':
        return <Input {...itemConfig.itemProps} />;
      case 'InputRange':
        return (
          <div className={styles.inputRangeWrapper}>
            <Form.Item noStyle name={`${itemConfig.name}Start`}>
              <Input {...itemConfig.itemProps} className={styles.rangeInput} />
            </Form.Item>
            <div className={styles.inputDivide}>~</div>
            <Form.Item noStyle name={`${itemConfig.name}End`}>
              <Input {...itemConfig.itemProps} className={styles.rangeInput} />
            </Form.Item>
          </div>
        );
      case 'select':
        return <Select {...itemConfig.itemProps} />;
      case 'dateRange':
        return (
          <RangePicker
            placeholder={[itemConfig.itemProps.placeholder1, itemConfig.itemProps.placeholder2]}
            allowEmpty={[false, false]}
            separator={<span>~</span>}
            className="common-date-select"
            dropdownClassName="common-date-drop"
          />
        );
      default:
        return <div />;
    }
  };

  const toResetForm = useCallback(() => {
    TotalSearchForm.resetFields();
    resetForm();
  }, [TotalSearchForm, resetForm]);

  // 查询列表数据
  const toSearch = () => {
    const formValues = TotalSearchForm.getFieldsValue();
    searchForm(formValues);
  };

  const resetFormValues = () => {
    TotalSearchForm.resetFields();
    toSearch();
  };

  useEffect(() => {
    // console.log(searchForm)
    if (formrefresh !== 0) {
      resetFormValues();
    }
  }, [formrefresh]);

  const changeCollapsedStatus = useCallback(() => {
    setCollapsedStatus(!collapsedStatus);
  }, [collapsedStatus]);
  const handleResize = () => {
    setShowSearchCollaps(window.innerWidth < 1588);
  };

  useEffect(() => {
    // 监听
    window.addEventListener('resize', handleResize);
    // 销毁
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    handleResize();
  }, []);
  return (
    <div
      className={[
        styles.listSearchWrapper,
        'list-search-cover-antd',
        collapsedStatus ? styles.listSearchFromUp : styles.listSearchFormDown,
        showSearchCollaps ? styles.hasCollaps : '',
      ].join(' ')}
    >
      <Form
        className={styles.formWrapper}
        name="TotalSearchForm"
        autoComplete="off"
        form={TotalSearchForm}
      >
        {searchFormConfig.map((item) => {
          if (item.itemType === 'empty') {
            // 空的填充元素
            return <div className={styles.formItem} key={item.name} />;
          }
          return (
            <Form.Item
              className={styles.formItem}
              label={item.label}
              name={item.name}
              key={item.name}
            >
              {renderFormItem(item)}
            </Form.Item>
          );
        })}
        {<div className={styles.formItem} key={'empty'} />}

        <div
          className={[styles.searchBtnArea, showSearchCollaps ? 'showCollaps' : 'noCollaps'].join(
            ' ',
          )}
        >
          {/* <div className={styles.searchBtnArea}> */}
          <Button
            type="primary"
            onClick={toSearch}
            className={`${styles.btnCommon} ${styles.toSearch}`}
          >
            查询
          </Button>
          <Button
            type="default"
            onClick={toResetForm}
            className={`${styles.btnCommon} ${styles.toReset}`}
          >
            重置
          </Button>
          {showSearchCollaps && (
            <a className={styles.handleCollapsed} onClick={changeCollapsedStatus}>
              <span style={{ marginRight: '4px' }}>{collapsedStatus ? '展开' : '收起'}</span>
              {/* <CRMIconFont
                type={collapsedStatus ? 'icon-zhankaishouqichangtai' : 'icon-xialaicon_jihuo_lanse'}
              /> */}
            </a>
          )}
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
