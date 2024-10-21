import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify } from 'hono/jwt';
import { User, Post } from '@prisma/client/edge';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/api/*', cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/post', postRouter);

// app.use('/api/v1/blog/*', async (c, next) => {
//   const header = c.req.header('authorization') || '';
//   const repsonse = await verify(header, c.env.JWT_SECRET);

//   if (repsonse.id) {
//     await next();
//   } else {
//     c.status(401);
//     return c.json({
//       error: 'Unauthorized',
//     });
//   }
// });

export default app;
