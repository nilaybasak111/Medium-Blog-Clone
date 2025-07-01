import { Hono } from "hono";
import { verify } from "hono/jwt";
import { userRouter } from "./route/user-route";
import { blogRouter } from "./route/blog-route";

// To get the right types on c.env, when initializing the Hono app.
// Pass the types of env as a generic
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
