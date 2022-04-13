import request from '@/utils/request';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import React, { useEffect } from 'react';

interface DropSelectProps extends Omit<SelectProps, 'options' | 'children'> {
  searchInfo: { api: string };
}

const DropSelect: React.FC<DropSelectProps> = ({ searchInfo, ...props }) => {
  const { api } = searchInfo;
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    request(api).then((res) => {
      setOptions(
        res?.data?.data?.map((item: any) => ({
          label: item.desc,
          value: item.code,
        })) || [],
      );
      setLoading(false);
    });
  }, [api]);

  return <Select options={options} loading={loading} {...props} labelInValue />;
};
export default DropSelect;
