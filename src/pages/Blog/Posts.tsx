import Image from "components/Image";
import { wpRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useMediaQuery, usePostsQuery } from "services/wordpress";

export default function Posts() {
  const { data: _posts = [], isLoading, isError } = usePostsQuery({});
  if (!isLoading) return <p>Loading...TODO: create skeleton</p>;
  if (isError) return <p>Error loading posts...</p>;
  if (_posts.length <= 0) return <p>No posts found</p>;

  return (
    <div className="w-full grid content-start pb-16">
      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <div className="padded-container justify-items-center lg:content-start text-gray">
          <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            Posts
          </h1>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {_posts.map((post, _index) => (
              <div
                className="relative overflow-clip rounded-lg border border-prim hover:border-blue dark:hover:border-blue"
                key={post.slug}
              >
                <Link
                  to={`${wpRoutes.blog}/${post.slug}`}
                  className="grid grid-rows-[auto_1fr] h-full"
                >
                  <Media id={post.featured_media} />
                  <div className="flex flex-col p-3 pb-4 gap-3">
                    <h2 className="text-ellipsis line-clamp-2 text-blue">
                      {post.title.rendered}
                    </h2>
                    <p
                      className="justify"
                      // biome-ignore lint: <explanation>
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    ></p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Media({ id }: { id: number }) {
  const { data: url } = useMediaQuery(id);
  return <Image className="rounded-lg p-[5px]" src={url} />;
}
