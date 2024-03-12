import Image from "components/Image";
import { Link } from "react-router-dom";
import { useMediaQuery, usePostsQuery } from "services/wordpress";

export default function Posts() {
  const { data: _posts, isLoading, isError } = usePostsQuery({});
  if (isLoading) return <p>Loading...TODO: create skeleton</p>;
  if (!_posts || isError) return <p>Error loading posts..</p>;

  return (
    <div className="grid gap-y-4 content-start padded-container min-h-screen">
      <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
        Posts
      </h1>
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
        {_posts.map((post, _index) => (
          <Link
            key={post.slug}
            to={post.slug}
            className="grid grid-rows-[auto_1fr] h-full bg-white rounded-lg overflow-clip shadow-sm"
          >
            <Media id={post.featured_media} />
            <div className="flex flex-col p-3 pb-4 gap-3">
              <h2 className="text-pretty">{post.title.rendered}</h2>
              <p
                className="text-navy-l1"
                // biome-ignore lint: trusted html
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              ></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Media({ id }: { id: number }) {
  const { data: url } = useMediaQuery(id);
  return <Image src={url} />;
}
