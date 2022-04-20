import request from '@/utils/request';

export async function addNewVisitLog(params: any) {
  return request('/api/visitor/command/addVisitor', {
    method: 'POST',
    data: params,
  });
}

export async function invaildVisitLog(params: any) {
  return request('/api/visitor/command/invalid', {
    method: 'POST',
    data: params,
  });
}

export async function exportVisitLog(params: any) {
  return request('/api/visitor/command/export', {
    method: 'POST',
    data: params,
  });
}

