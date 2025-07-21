import { Link } from "react-router-dom";
import { AvatarComponent } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center cursor-pointer">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div>
        <Link to={"/publish"}>
          <button className="m-4 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
            New Blog
          </button>
        </Link>
        <AvatarComponent size={"big"} name="Nilay Basak" />
      </div>
    </div>
  );
};
