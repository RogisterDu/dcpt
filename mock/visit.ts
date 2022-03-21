import { Request, Response } from 'express';
import mockjs from 'mockjs';

const visitList = (req: Request, res: Response) => {
  const data = mockjs.mock({
    'dataList|100': [
      {
        'id|+1': 1,
        name: () => {
          return mockjs.Random.cname();
        },
        phone: () => {
          return mockjs.Random.natural(10000000000, 19999999999);
        },
        visitTime: () => {
          return mockjs.Random.date('yyyy-MM-dd');
        },
        temperature: () => {
          return mockjs.Random.natural(36, 40);
        },
      },
    ],
  });
  res.json({
    code: 1,
    data: {
      dataList: data.dataList,
      total: 100,
    },
  });
};
export default {
  'POST /dcpt/visitList': visitList,
};
