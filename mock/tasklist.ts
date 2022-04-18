/*
 * @Author: your name
 * @Date: 2021-11-19 17:09:59
 * @LastEditTime: 2021-11-24 19:48:52
 * @LastEditors: Please set LastEditors
 * @Description: mock接口
 * @FilePath: /crm/mock/index.ts
 */
import mockjs, { Random } from 'mockjs';
import { Request, Response } from 'umi';

// 模拟标签列表的数据
function queryTaskList(req: Request, res: Response) {
  const data = mockjs.mock({
    'tags|200': [
      {
        'id|+1': 1,
        taskName: '导出任务' + Random.string(),
        type: Random.integer(0, 1),
        finishDatetime: Random.datetime(),
        taskStatus: Random.integer(0, 2),
        ifCanDownLoad: Random.boolean(),
        fileDownLoadUrl: Random.url(),
      },
    ],
  });
  res.json({
    code: 200,
    success: true,
    data: data.tags,
    total: data.tags.length,
  });
}

export default {
  // 支持值为 Object 和 Array
  'POST /dcpt/welcome': queryTaskList,
};
