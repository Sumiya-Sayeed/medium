import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, jwt, sign, verify } from 'hono/jwt';
import { User, Post } from '@prisma/client/edge';
import { JWTPayload } from 'hono/utils/jwt/types';

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId?: string;
  };
}>();

interface UserPayload extends JWTPayload {
  id: string; // or whatever other properties you expect
}

postRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('authorization') || '';

  try { 
    const user = (await verify(authHeader, c.env.JWT_SECRET)) as UserPayload;

    if (user) {
      c.set('userId', user.id);
      await next();
    } else {
      c.status(401);
      return c.json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    console.log(error);
    c.status(401);
    return c.json({
      message: 'Unauthorized',
    });
  }
});

postRouter.post('/create', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.authorId,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: 'User is unuthorized',
    });
  }
});

postRouter.put('/update', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: 'Something went wrong',
    });
  }
});

postRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: 'Something went wrong',
    });
  }
});

postRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (post) {
      return c.json({
        post,
      });
    }

    c.status(404);

    return c.json({
      message: 'Post not found',
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: 'Something went wrong',
    });
  }
});
