import request from '@/utils/request';

export async function queryReservationByDate(params: any) {
  return request('/api/reserve/command/list/date/query', {
    method: 'POST',
    data: params,
  });
}

export async function addNewReservation(params: any) {
  return request('/api/reserve/command/add', {
    method: 'POST',
    data: params,
  });
}

export async function editReservation(params: any) {
  return request('/api/reserve/command/edit', {
    method: 'POST',
    data: params,
  });
}
