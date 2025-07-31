# Medium Blog Clone
This is a Medium Blog Clone website. Here, you can sign up and log in using your email account. You can then view posts by other authors and also publish your own articles.

# Improvement Scopes -

Backend

- Use Zod & Hashing for validation and password hashing
- You can add pagination in /api/v1/blog/bulk endpoint
- Add Expiry for the JWT
- Add Published Time in Blog
- Add LogOut Feature in Frontend / Backend
- Add Delete Endpoint for the Blog

Frontend

- Add Clean message in Frontend\src\components\Auth.tsx sendRequest function
- Add Cloudflare worker link in Frontend\src\config.ts BACKEND_URL
- Move BACKEND_URL to the .env file
- Add caching to the blog frontend and backend to prevent loading the article, Username(AvatarComponent) every time it is accessed
- You can design a basic homepage for the blog
- In AppBar.tsx (Line 16) set authorname dynamically. This may change avatar component dynamically. Create a hook to get initials of the logged in user
- Add Delete & Edit Page for the Blog