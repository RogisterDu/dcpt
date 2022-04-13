import request from '@/utils/request';

export async function login(params: any) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
