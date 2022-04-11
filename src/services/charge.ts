import request from '@/utils/request';
export async function queryChargeList(params: any) {
  return request('/api/charge/item/query/paging', {
    method: 'POST',
    data: params,
  });
}
