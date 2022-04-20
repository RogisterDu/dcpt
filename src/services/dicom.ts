import request from "@/utils/request";
export async function queryDicomList(params: any) {
    return request(`/api/dicom/query/list/paginate`, {
        method: 'POST',
        data: params,
    });
}