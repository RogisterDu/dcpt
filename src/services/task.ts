import request from '@/utils/request';

export async function queryTaskList(params: any) {
  return request('/api/task/query/list/paging', {
    method: 'POST',
    data: params,
  });
}

export async function updateTaskStatus(params: any) {
  return request('/api/task/command/update/status', {
    method: 'GET',
    params,
  });
}
