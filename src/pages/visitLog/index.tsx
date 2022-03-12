import React from 'react';
import './index.less';
import SearchForm from '@/pages/components/SearchForm';
import { visitSearchConfig } from './data';
const visitLog: React.FC = () => {
  const toSearch = () => {};
  const toReset = () => {};
  return (
    <div>
      <SearchForm searchFormConfig={visitSearchConfig} ResetForm={toReset} toSearch={toSearch} />
    </div>
  );
};
export default visitLog;
