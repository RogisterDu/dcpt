import { removeToken } from '@/utils/token';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const toLogOut = () => {
    removeToken();
    window.location.href = '/user/login';
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={toLogOut}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space className={className}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          <Avatar shape="square" size="small" src="https://joeschmoe.io/api/v1/random" />
          个人中心 <DownOutlined />
        </a>
      </Dropdown>
    </Space>
  );
};

export default GlobalHeaderRight;
