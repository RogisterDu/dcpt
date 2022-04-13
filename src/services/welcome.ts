import request from '@/utils/request';

export async function getWelcome() {
  return request('/dcpt/welcome', {
    method: 'GET',
  });
}
