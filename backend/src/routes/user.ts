import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify } from 'hono/jwt';
import { signInInput, signUpInput } from '@sumiya_sayeed/medium-common-1';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  console.log(c.req, 'req');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log('success', body);

  const { success, error } = signUpInput.safeParse(body);

  console.log('success', success, error);

  if (!success) {
    c.status(400);
    console.log(error);
    return c.json({
      message: 'Invalid input',
    });
  }

  try {
    console.log(body, 'body');
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    console.log(user, 'user');

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: 'User already exists',
    });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);

  console.log('success', success);

  if (!success) {
    c.status(400);
    return c.json({
      message: 'Invalid input',
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(401);
      return c.json({
        message: 'Invalid email or password',
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: 'Invalid',
    });
  }
});
