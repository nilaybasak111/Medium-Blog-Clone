import { Link } from "react-router-dom";
import { AvatarComponent } from "./BlogCard";
import { useUser } from "../hooks";

export const AppBar = () => {
  const { user, loading } = useUser();
  const authorName = user?.name || "Anonymous";
  // console.log("authorName:", authorName);

  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <Link to={"/blogs"} className="text-xl font-semibold">
          Medium
        </Link>
      </div>

      {/* Button and Avatar */}
      <div className="flex items-center gap-4">
        <Link to={"/publish"}>
          <button className="shadow-[0_4px_14px_0_rgb(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:bg-[rgba(16,185,129,0.9)] px-8 py-2 bg-[#10b981] rounded-md text-white font-light transition duration-200 ease-linear">
            New Blog
          </button>
        </Link>

        {/* Avatar or Placeholder */}
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse flex items-center justify-center" />
        ) : (
          <AvatarComponent size="big" name={authorName} />
        )}
      </div>
    </div>
  );
};
