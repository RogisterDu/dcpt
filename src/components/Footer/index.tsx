// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = 'RogisterDu';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Personal',
          title: '软件工程181 杜嘉诚 毕业设计',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: '前端git',
          href: 'https://github.com/RogisterDu/dcpt',
          blankTarget: true,
        },
        {
          key: 'backend',
          title: '后端Git',
          href: 'https://github.com/RogisterDu/dcptbackend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
