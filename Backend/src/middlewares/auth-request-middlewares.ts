import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

// ✅ Defining context using interface instead of type
interface AuthContext {
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}

// ✅ Implementation Auth Middleware
export const authMiddleware: MiddlewareHandler<AuthContext> = async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  // Adding Bearer Token Verification Here in Backend
  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.json({ message: "JWT Token Not Found / JWT Format Not Correct" });
  }
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", String(user.id));
      await next();
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "You Are Not Logged In" });
  }
};
