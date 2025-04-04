import { NavLink } from "@remix-run/react";
import ContentLoader from "components/content-loader";
import Media from "components/media";
import { appRoutes } from "constants/routes";
import type { Wordpress } from "types/wordpress";

const BlogCard = (props: Wordpress.Post) => {
  return (
    <div className="h-[27rem] has-[.pending]:grayscale grid gap-3 pb-5 rounded-3xl bg-white">
      <Media
        sizes="(max-width: 640px) 100vw, 33vw"
        id={props.featured_media}
        classes="rounded-t-[18px] object-fill object-center h-44"
      />

      <h3
        className="text-[#0D283A] font-semibold w-full text-xl line-clamp-2 px-6"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: props.title.rendered }}
      />
      <p
        className="text-[#0D283A] text-sm md:text-base line-clamp-4 px-6 tracking-tighter text w-full"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }}
      />
      <NavLink
        to={`${appRoutes.blog}/${props.slug}`}
        className="self-end mt-auto text-blue-d1 px-4 py-2 rounded-full font-semibold uppercase"
      >
        Read More
        <span className="sr-only">: {props.slug.replace(/-/g, " ")}</span>
      </NavLink>
    </div>
  );
};

export const Skeleton = () => (
  <ContentLoader className="h-[27rem] rounded-3xl" />
);

export default BlogCard;
