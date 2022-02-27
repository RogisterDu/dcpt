import { Request, Response } from 'express';
const login = (req: Request, res: Response) => {
  res.json({
    code: 1,
    data: {
      token: 'token',
      user: {
        id: 1,
        name: 'name',
        avatar: 'avatar',
      },
    },
  });
};

const welcome = (req: Request, res: Response) => {
  res.json({
    code: 1,
    data: {
      content: 'helloWorld',
    },
  });
};

export default {
  'POST /dcpt/user/login': login,
  'GET /dcpt/welcome': welcome,
};
