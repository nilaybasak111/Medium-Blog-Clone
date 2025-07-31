import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

// Circle Component for the Blog
export function Circle() {
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
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join("") || "A";
  const sizeClass = size === "big" ? "w-10 h-10 text-lg" : "w-8 h-8 text-sm";

  return (
    <div
      className={`rounded-full bg-blue-600 text-white flex items-center justify-center ${sizeClass}`}
    >
      {initials}
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
  //console.log("publishedDate", publishedDate);
  const dateObj = new Date(publishedDate);

  const indianDateTime = dateObj.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
            {indianDateTime}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        {/* Add check here if content is greter than 100 then use ... */}
        <div className="text-md font-thin">
          {content.length > 100 ? content.slice(0, 100) + "...." : content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} Minute(s) Take to Read`}</div>
      </div>
    </Link>
  );
};
