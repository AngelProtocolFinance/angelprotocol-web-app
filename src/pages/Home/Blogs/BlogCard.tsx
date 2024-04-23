import Media from "components/Media";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Wordpress } from "types/wordpress";
import s from "./styles.module.css";

const BlogCard = (props: Wordpress.Post) => {
  return (
    <div
      className={`w-full md:w-full h-[460px] borderLine flex flex-col gap-3 pb-5 rounded-[18px] relative ${s.blog_card} overflow-hidden bg-white font-body`}
    >
      <Media
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        id={props.featured_media}
        classes="rounded-t-[18px] object-fill object-center h-[179px]"
      />

      <div className="flex gap-2 px-6" />
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
