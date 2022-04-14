import request from '@/utils/request';
export async function queryChargeList(params: any) {
  return request('/api/charge/item/enable/query/paging', {
    method: 'POST',
    data: params,
  });
}

export async function queryChargeManage(params: any) {
  return request('/api/charge/item/all/query/paging', {
    method: 'POST',
    data: params,
  });
}

export async function addNewCharge(params: any) {
  return request('/api/charge/item/command/add', {
    method: 'POST',
    data: params,
  });
}

export async function editCharge(params: any) {
  return request('/api/charge/item/command/edit', {
    method: 'POST',
    data: params,
  });
}
