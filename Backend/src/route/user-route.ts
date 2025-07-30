import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@nilaybasak111/medium-common";
import { authMiddleware } from "../middlewares/auth-request-middlewares";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

/*
 * Sign Up Route
 * POST : /api/v1/user/signup
 * req.body = { name: "nilaybasak", email : "nilaybasak@gmail.com", password : "12345678" }
 */
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Please Enter Correct Credentials" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    // Generating JWT & Returning to the User
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error While Signing Up" });
  }
});

/*
 * Sign In Route
 * POST : /api/v1/user/signin
 * req.body = { email : "nilaybasak@gmail.com", password : "12345678" }
 */
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Please Enter Correct Credentials" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User Not Found" });
    }

    // Generating JWT & Returning to the User
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error While Signing In" });
  }
});

/*
 * User Info Route
 * GET : /api/v1/user/info
 * req.body = {}
 * header => Authorization => Bearer JWT
 */
userRouter.get("/info", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Getting User Id From JWT
   const userId = c.get("userId");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }, select: {
        id: true,
        email: true,
        name: true
      }
    });

      if (!user) {
      c.status(403);
      return c.json({ error: "User Not Found" });
    }

    return c.json({ user: user });

  } catch (error) {
    c.status(403);
    return c.json({ error: "Error While Fetching User Info" });
  }
});
