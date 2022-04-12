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

export async function toVaildCharge(params: any) {
  const { id } = params;
  return request(`/api/fee/command/invalid/id/${id}`, {
    method: 'GET',
  });
}

export async function addEmptyCharge(params: any) {
  const { patientId } = params;
  return request(`/api/fee/command/add/id/${patientId}`, {
    method: 'GET',
  });
}
