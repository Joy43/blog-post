import cors from 'cors';
import express, { Request, Response } from 'express';

import router from './app/routes';



const app = express()
// parsers api
app.use(express.json());
app.use(cors());
// -----api end point--------
app.use('/api', router);


// -----root api endpoint------
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'blog_post Server is running successfully 🏃🏽‍♂️➡️',
  });
});

export default app;

