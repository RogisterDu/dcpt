/*
 * @Author: Rogister - JCDu
 * @Date: 2022/1/18
 * @LastEditors: Rogister Du
 * @LastEditTime: 2022/1/18
 * @Description: 详情公用组件
 */
import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
/**
 * @param layoutConfig 表单布局配置
 * @param dataConfig 表单数据配置
 * @interface FormDetailProp
 */
interface FormDetailProp {
  layoutConfig?: layoutConfig;
  dataConfig: dataConfig[];
}
interface layoutConfig {
  // mode?: string; // view查看模式 edit编辑模式
  rowPerCol?: number; // 每行显示多少个
  //[{xxl:4,lg:6,md:8}]
  // align?: string; // 对齐方式  vertical垂直 horizontal水平
  colon?: boolean; // 是否显示冒号
  // titleClass?: string; // 标题样式
  // labelClass?: string; // 标签样式
  // contentClass?: string; // 内容样式
}
interface dataConfig {
  title: string; // 标题
  key: string; // key
  children?: children[]; // 子项
}
interface children {
  label: string; // 字段名称
  defaultValue: any; // 展示内容
  key?: string; // key
  span?: number; // 占据多少列
  type?: string; // 展示类型 plainText 文本(Default) component 组件
}

const FormDetail: React.FC<FormDetailProp> = ({ layoutConfig, dataConfig }) => {
  //初始化入参
  const layoutConfigDefault: layoutConfig = {
    // mode: 'view',
    rowPerCol: 2,
    // align: 'horizontal',
    colon: true,
  };

  const layout = {
    ...layoutConfigDefault,
    ...layoutConfig,
  };
  // const { rowPerCol, colon } = layout;
  const { colon } = layout;
  // const colCount = [2, 3, 4, 6, 8, 12];

  // const spanPerCol = 24 / rowPerCol;
  // console.log('layout', layout);
  // console.log('spanPerCol', dataConfig);

  const renderContent = (child: any) => {
    const { type, defaultValue } = child;
    // console.log('type', type);
    // console.log('defaultValue', defaultValue);
    switch (type) {
      case 'component':
        return <div>{defaultValue}</div>;
      default:
        return defaultValue || '-';
    }
  };
  return (
    <>
      {dataConfig.map((item: any) => {
        return (
          <div className="item-area" key={item.key}>
            <div className="detail-title">
              {item.title}
              {colon && ':'}
            </div>
            {item.children && item.children.length ? (
              <Row gutter={[8, 8]} wrap justify="start">
                {item.children.map((child: any) => {
                  return (
                    <Col
                      xs={24}
                      sm={child.span ? child.span : 24}
                      // md={child.span ? child.span : spanPerCol * 2}
                      // xxl={child.span ? child.span : spanPerCol}
                      md={child.span ? child.span : 12}
                      lg={child.span ? child.span : 8}
                      xxl={child.span ? child.span : 6}
                      key={child.key}
                    >
                      <div className="details-tab">
                        <div className="detail-label">
                          {child.label}
                          {colon && ':'}
                        </div>
                        <div className="detail-content">{renderContent(child)}</div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default FormDetail;
