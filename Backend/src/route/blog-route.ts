import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@nilaybasak111/medium-common";
import { authMiddleware } from "../middlewares/auth-request-middlewares";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Adding Auth Middleware
blogRouter.use("/*", authMiddleware);

/*
 * Blog Creation Route
 * POST : /api/v1/blog
 * req.body = { title : "Hello, I am Nilay Basak", content : "First Blog from Nilay" }
 * header => Authorization => Bearer JWT
 */
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Please Enter Correct Credentials" });
  }
  //console.log("Checking type of authorId", typeof authorId);

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
      publishedDate: new Date(),
    },
  });
  return c.json({
    id: blog.id,
  });
});

/*
 * Blog Updating Route
 * PUT : /api/v1/blog
 * req.body = { id: "post_id" , title : "Hello, I am Nilay Basak", content : "First Blog from Nilay" }
 * header => Authorization => Bearer JWT
 */
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Please Enter Correct Credentials" });
  }

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

// Add Pagination Logic Here
/*
 * Fetch All Blogs Route
 * GET : /api/v1/blog/bulk
 * req.body = {}
 */
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      publishedDate: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

/*
 * Fetch A Blogs By It's Id Route
 * GET : /api/v1/blog/:id
 * req.body = {}
 */
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Error While Fetching Blog Post" });
  }
});
