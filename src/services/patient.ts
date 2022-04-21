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

export async function queryFuzzyPatient(params: any) {
  return request('/api/patient/list/query/fuzzy', {
    method: 'GET',
    params,
  });
}

export async function addNewPatient(params: any) {
  return request('/api/patient/command/add', {
    method: 'POST',
    data: params,
  });
}
