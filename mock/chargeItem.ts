import { Request, Response } from 'express';
import mockjs from 'mockjs';

const chargeList = (req: Request, res: Response) => {
  const data = mockjs.mock({
    'dataList|100': [
      {
        'id|+1': 1,
        code: () => {
          return mockjs.Random.natural(10001, 20000);
        },
        chargeItem: () => {
          return mockjs.Random.cname();
        },
        unitPrice: () => {
          return mockjs.Random.natural(1, 100);
        },
        unit: () => {
          return '元/件';
        },
      },
    ],
  });
  res.json({
    code: 1,
    data: data.dataList,
    total: 100,
  });
};
export default {
  'GET /dcpt/chargeList/chargeItem': chargeList,
};
