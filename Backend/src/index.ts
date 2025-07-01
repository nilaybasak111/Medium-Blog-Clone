import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

// To get the right types on c.env, when initializing the Hono app.
// Pass the types of env as a generic
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Middlewares
app.use("/api/v1/blog/*", async (c, next) => {
  // Get The Header
  // Verify The Header
  // If The Header Is Correct, Allow The Request
  // We Return The User With A 403 Status Code
  const header = c.req.header("authorization") || "";
  // Expecting A Bearer Token
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "Invalid Token, Unauthorized" });
  }
});

// Sign Up Route
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User Not Found" });
    }

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

// Sign in Route
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
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

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default app;
