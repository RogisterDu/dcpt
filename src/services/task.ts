import request from '@/utils/request';

export async function queryTaskList(params: any) {
  return request('/dcpt/welcome', {
    method: 'POST',
    data: params,
  });
}

export async function updateTaskStatus(params: any) {
  return request('/dcpt/welcome', {
    method: 'GET',
    params,
  });
}
