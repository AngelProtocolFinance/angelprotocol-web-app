import Icon from "components/Icon";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePostQuery } from "services/wordpress";
import Media from "./Media";

export default function Post() {
  const { slug = "" } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = usePostQuery(slug, { skip: !slug });

  if (isLoading) return <p>Loading... TODO: create skeleton for this</p>;
  if (!post || isError) return <p>error</p>;

  return (
    <div className="padded-container max-w-4xl mx-auto">
      <Link
        to={".."}
        className="flex items-center gap-2 font-medium text-blue-d1 hover:text-blue mt-6"
      >
        <Icon type="ChevronLeft" className="text-[1em]" />
        <span>Go Back</span>
      </Link>

      <Media
        sizes="(min-width: 896px) 896px, 100vw"
        id={post.featured_media}
        classes="relative w-full object-cover object-top mt-4"
      />
      <h1
        className="font-heading text-xl md:text-2xl lg:text-3xl break-words my-8 text-pretty text-center"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p className="font-bold text-xs tracking-wider uppercase text-center mt-8">
        Updated on:{" "}
        <span className="text-xs text-gray-d1">
          {new Date(post.modified).toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </p>

      <div
        className="wp-post"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
