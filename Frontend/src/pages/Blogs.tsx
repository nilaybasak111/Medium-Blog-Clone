import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-xl">
        <BlogCard
          authorName={"Nilay Basak"}
          title={
            "First test blog frontend.First test blog frontend.First test blog frontend"
          }
          content={
            "Loren Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Quia, quibusdam. Nisi, quidem. Quia, quibusdam. Nisi, quidem."
          }
          publishedDate={"2023-01-01"}
        />
      </div>
    </div>
  );
};
