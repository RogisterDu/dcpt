import request from '@/utils/request';
export async function queryFeeList(params: any) {
  const { patientId } = params;
  return request(`/api/fee/query/list/id/${patientId}`, {
    method: 'GET',
  });
}

export async function saveChargeItem(params: any) {
  return request('/api/fee/command/save', {
    method: 'POST',
    data: params,
  });
}

export async function payToCharge(params: any) {
  return request('/api/fee/command/pay', {
    method: 'POST',
    data: params,
  });
}
