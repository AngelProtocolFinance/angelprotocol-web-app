import { ContentLoader } from "components/content-loader";
import { Media } from "components/media";
import { NavLink, href } from "react-router";
import type { IPost } from "types/wordpress";

export const BlogCard = (props: IPost) => {
  return (
    <div className="relative hover:border-blue-l2 has-[.pending]:grayscale grid grid-rows-subgrid row-span-4 gap-3 pb-5 rounded bg-white border border-gray-l3">
      <Media
        sizes="(max-width: 640px) 100vw, 33vw"
        id={props.featured_media}
        classes="rounded-t object-contain object-center w-full"
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
        to={href("/blog/:slug", { slug: props.slug })}
        className="absolute inset-0"
      />
      <NavLink
        to={href("/blog/:slug", { slug: props.slug })}
        className="z-10 justify-self-end mt-auto text-blue-d1 px-4 py-2 rounded font-semibold uppercase"
      >
        Read More
        <span className="sr-only">: {props.slug.replace(/-/g, " ")}</span>
      </NavLink>
    </div>
  );
};

export const Skeleton = () => <ContentLoader className="h-[27rem] rounded" />;
