import Media from "components/Media";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Wordpress } from "types/wordpress";

const BlogCard = (props: Wordpress.Post) => {
  return (
    <div className="border border-[#dbdada] flex flex-col gap-3 pb-5 rounded-2xl overflow-hidden bg-white">
      <Media
        sizes="(max-width: 640px) 100vw, 33vw"
        id={props.featured_media}
        classes="rounded-t-[18px] object-fill object-center h-[179px]"
      />

      <h4
        className="text-[#0D283A] font-semibold w-full text-xl line-clamp-2 px-6"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: props.title.rendered }}
      />
      <p
        className="text-[#0D283A] text-sm md:text-base line-clamp-4 px-6 tracking-tighter text w-full  "
        id="desc"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }}
      />
      <Link
        to={`${appRoutes.blog}/${props.slug}`}
        className="self-end mt-auto text-blue-d1 px-4 py-2 rounded-full font-semibold uppercase"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
