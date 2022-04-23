import request from '@/utils/request';

export async function queryAccoutManage(params: any) {
  return request('/api/account/normal/query/paging', {
    method: 'POST',
    data: params,
  });
}

export async function addNewAccount(params: any) {
  return request('/api/account/command/add', {
    method: 'POST',
    data: params,
  });
}

export async function editAccount(params: any) {
  return request('/api/account/command/edit', {
    method: 'POST',
    data: params,
  });
}

export async function getAccess() {
  return request('/api/account/access', {
    method: 'GET',
  });
}

export async function getSelfAccountInfo() {
  return request('/api/account/command/self/info', {
    method: 'GET',
  });
}

export async function editSelfAccount(params: any) {
  return request('/api/account/command/self/edit', {
    method: 'POST',
    data: params,
  });
}