import Breadcrumbs from "components/Breadcrumbs";
import { appRoutes, wpRoutes } from "constants/routes";
import { useParams } from "react-router-dom";
import { useMediaQuery, usePostQuery } from "services/wordpress";

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
    <>
      <PostBanner id={post.featured_media} />

      <div className="padded-container px-[15%]">
        <div className="grid justify-center items-center text-center py-5">
          <Breadcrumbs
            className="text-xs sm:text-sm justify-start"
            items={[
              { title: "Blog", to: appRoutes.blog },
              {
                title: post.title.rendered,
                to: `${wpRoutes.blog}/${slug}`,
              },
            ]}
          />
          <h1 className="font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            {post.title.rendered}
          </h1>
          <div className="text-center">
            <p className="font-bold text-xs tracking-wider uppercase">
              Updated on:{" "}
              <span className="text-xs text-gray-d1">
                {new Date(post.modified).toLocaleDateString("en-UK", {
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
          // biome-ignore lint: <explanation>
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </>
  );
}

function PostBanner({ id }: { id: number }) {
  const { data: url } = useMediaQuery(id);
  return (
    <div
      className="relative w-full h-52 sm:h-72 bg-cover bg-center"
      style={{
        backgroundImage: `url(${url})`,
      }}
    />
  );
}
