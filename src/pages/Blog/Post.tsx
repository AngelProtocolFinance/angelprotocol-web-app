import Breadcrumbs from "components/Breadcrumbs";
import { appRoutes, wpRoutes } from "constants/routes";
import { useParams } from "react-router-dom";
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
    <div>
      <Media
        sizes="100vw"
        id={post.featured_media}
        classes="relative w-full h-52 sm:h-72 object-cover object-top"
      />

      <div className="padded-container max-w-4xl">
        <div className="grid justify-center items-center text-center py-5">
          <Breadcrumbs
            className="text-xs sm:text-sm justify-start"
            items={[
              { title: "Blog", to: appRoutes.blog, end: true },
              {
                title: { __html: post.title.rendered },
                to: `${wpRoutes.blog}/${slug}`,
              },
            ]}
          />
          <h1
            className="font-heading text-[1.63rem]/tight md:text-3xl/tight lg:text-[2.75rem]/tight break-words my-5"
            //biome-ignore lint: trusted html
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="text-center">
            <p className="font-bold text-xs tracking-wider uppercase">
              Updated on:{" "}
              <span className="text-xs text-gray-d1">
                {new Date(post.modified).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
        <div
          className="grid padded-container px-2 wp-post"
          //biome-ignore lint: trusted html
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </div>
  );
}
