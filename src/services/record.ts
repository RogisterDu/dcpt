import request from '@/utils/request';
export async function queryRecordList(params: any) {
  const { patientId } = params;
  return request(`/api/medical/query/list/${patientId}`, {
    method: 'GET',
  });
}

export async function addRecord(params: any) {
  const { patientId } = params;
  return request(`/api/medical/command/add/${patientId}`, {
    method: 'GET',
  });
}

export async function editRecord(params: any) {
  return request('/api/medical/command/edit', {
    method: 'POST',
    data: params,
  });
}
