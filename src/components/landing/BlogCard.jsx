import { appRoutes } from "constants/routes";
import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";

const sanitize = (dirtyHTML) => {
  const cleanHtml = DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: ["p", "span", "b", "i", "u"],
  });

  return cleanHtml;
};

const BlogCard = ({ blog, imgUrl }) => {
  return (
    <div className="w-full md:w-full h-[460px] borderLine flex flex-col gap-3 pb-5 rounded-[18px] relative blog_card overflow-hidden bg-white font-body">
      <img
        src={imgUrl}
        alt="thumbnail"
        className="rounded-t-[18px] object-fill object-center h-[179px]"
      />

      <div className="flex gap-2 px-6" />
      <h4
        className="text-[#0D283A] font-semibold w-full text-xl line-clamp-2 px-6"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
      />
      <p
        className="text-[#0D283A] text-sm md:text-base line-clamp-4 px-6 tracking-tighter text w-full  "
        id="desc"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: sanitize(blog?.excerpt?.rendered) }}
      />

      <Link
        to={`${appRoutes.blog}/${blog.slug}`}
        className="self-end mt-auto text-blue-d1 px-4 py-2 rounded-full font-semibold uppercase"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
