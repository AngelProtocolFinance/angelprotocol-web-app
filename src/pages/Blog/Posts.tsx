import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { Link } from "react-router-dom";
import { useMediaQuery, usePostsQuery } from "services/wordpress";
import { Wordpress } from "types/wordpress";

export default function Posts() {
  const query = usePostsQuery({});

  return (
    <div className="grid gap-6 m:grid-cols-2 lg:grid-cols-3 content-start padded-container min-h-screen pb-6">
      <h1 className="col-span-full text-xl md:text-2xl lg:text-3xl break-words mt-6">
        Posts
      </h1>

      <QueryLoader
        queryState={query}
        messages={{
          empty: "No posts found.",
          error: "Failed to load posts",
          loading: (
            <>
              {Array(9)
                .fill(null)
                .map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
            </>
          ),
        }}
      >
        {(posts) => <Cards posts={posts} />}
      </QueryLoader>
    </div>
  );
}

function Media({ id }: { id: number }) {
  //TODO: detailed image type and use src set
  const { data: url } = useMediaQuery(id);
  return <Image src={url} className="h-32 sm:h-60 w-full object-cover" />;
}

const Cards = (props: { posts: Wordpress.Post[] }) =>
  props.posts.map((post, _index) => (
    <Link
      key={post.slug}
      to={post.slug}
      className="grid grid-rows-[auto_1fr] h-full rounded-lg overflow-clip bg-blue-l5 hover:bg-blue-l4"
    >
      <Media id={post.featured_media} />
      <div className="flex flex-col p-4 gap-3">
        <h2
          className="text-pretty"
          // biome-ignore lint: trusted html
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />
        <p
          className="text-navy-l1"
          // biome-ignore lint: trusted html
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
      </div>
    </Link>
  ));

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-l4">
      <ContentLoader className="h-32 sm:h-60 w-full" />
      <div className="h-40" />
    </div>
  );
}
