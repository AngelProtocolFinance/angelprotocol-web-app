import Icon from "components/Icon";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePostQuery, useUserQuery } from "services/wordpress";
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
        className="text-xl md:text-2xl lg:text-3xl my-8 text-pretty"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p className="text-sm mt-8 text-navy-l1">
        Posted:{" "}
        {new Date(post.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <Author id={post.author} />
      <div className="w-full h-px bg-gray-l4 my-4" />

      <div
        className="wp-post"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}

function Author(props: { id: number }) {
  const { data } = useUserQuery(props.id);
  return data && <p className="text-navy-l1 text-sm">Author: {data.name}</p>;
}
