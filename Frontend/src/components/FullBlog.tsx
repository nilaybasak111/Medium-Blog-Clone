import type { Blogs } from "../hooks";
import { AppBar } from "./AppBar";
import { AvatarComponent } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  const dateObj = new Date(blog.publishedDate);

  const indianDateTime = dateObj.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted On {indianDateTime}
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <AvatarComponent
                  size="big"
                  name={blog.author.name || "Anonymous"}
                />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
