import { message } from 'antd';
/*
 * @Author: your name
 * @Date: 2021-12-13 17:51:31
 * @LastEditTime: 2022-01-12 18:00:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ppd-crm/src/utils/request.ts
 */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { getToken } from '@/utils/token';
// import { notification } from 'antd';
// import JsCookie from 'js-cookie';

// const codeMessage: Record<number, string> = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: { response: Response; data: any }): Response => {
  const { response, data = {} } = error;
  // const isEnglish = JsCookie.get('languageCode') === 'en' ? true : false;

  let resData;
  if (response && response.status) {
    const { status } = response;
    resData = typeof data === 'string' ? {} : data;
    if (status === 401) {
      message.error('登录状态失效，请重新登录');
      // if (!resData.errMsg) {
      // resData.errMsg = isEnglish ? 'Unauthorized' : 'Belum ada akses';
      // }
      window.location.replace('/user/login');
    } else if (status === 403) {
      if (!resData.errMsg) {
        // resData.errMsg = isEnglish ? 'No permission, please contact administrator' : 'Tidak ada akses, silakan hubungi Administrator';
      }
    }
  } else if (!response) {
    // resData = {errMsg: isEnglish ? 'Request timeout' : 'Permintaan lewas batas waktu'};
  }
  return resData;
};

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // default error handling
  // credentials: 'include', // Does the default request bring cookies
});

// 请求拦截
request.interceptors.request.use((url, options) => {
  // const languageId = JsCookie.get('languageCode') === 'in' ? '123' : '102';

  const { headers, ...otherOptions } = options;
  return {
    url,
    options: {
      ...otherOptions,
      headers: {
        // 'access-uid': JsCookie.get('accessUid') || '',
        // Authorization: JsCookie.get('adminToken') || '',
        Authorization: getToken() || '',
        // languageId,
        // uid: JsCookie.get('accessUid') || '',
        'Content-Type': 'application/json',
        ...headers,
      },
    },
  };
});

export default request;
