import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

// Circle Component for the Blog
function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

// Avatar Component for the Blog
export function AvatarComponent({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  // Take the first letter of the first two words
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${
        size === "big" ? "w-8 h-8" : "w-6 h-6"
      } dark:bg-gray-600`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } text-gray-600 dark:text-gray-300`}
      >
        {initials}
      </span>
    </div>
  );
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <AvatarComponent name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="flex justify-center flex-col pl-2 font-thin text-slate-500">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        {/* Add check here if content is greter than 100 then use ... */}
        <div className="text-md font-thin">
          {content.slice(0, 100) + "...."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} Minute(s) Take to Read`}</div>
      </div>
    </Link>
  );
};
