import request from '@/utils/request';

export async function queryPatientList(params: any) {
  return request('/api/patient/list/paging', {
    method: 'GET',
    params,
  });
}

export async function queryPatientDetails(params: any) {
  const { patientId } = params;
  return request(`/api/patient/info/${patientId}`, {
    method: 'GET',
  });
}
