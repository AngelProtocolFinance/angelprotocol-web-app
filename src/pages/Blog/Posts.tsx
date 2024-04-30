import ContentLoader from "components/ContentLoader";
import Media from "components/Media";
import QueryLoader from "components/QueryLoader";
import { Link } from "react-router-dom";
import { Wordpress } from "types/wordpress";
import usePagination from "./usePagination";

export default function Posts() {
  const {
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
    isFetching,
  } = usePagination();

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 content-start padded-container min-h-screen pb-6">
      <h1 className="font-bold uppercase col-span-full text-2xl lg:text-3xl break-words mt-6">
        Posts
      </h1>

      <QueryLoader
        queryState={{
          data: data?.posts,
          isLoading,
          isFetching,
          isError: isError,
        }}
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
        {(posts) => (
          <>
            <Cards posts={posts} />
            {hasMore && (
              <button
                type="button"
                className="col-span-full btn-blue rounded-full justify-self-center px-4 py-2 text-sm  mt-6"
                onClick={loadNextPage}
                disabled={isLoadingOrError}
              >
                Load more
              </button>
            )}
          </>
        )}
      </QueryLoader>
    </div>
  );
}

const Cards = (props: { posts: Wordpress.Post[] }) =>
  props.posts.map((post, _index) => (
    <Link
      key={post.slug}
      to={post.slug}
      className="grid grid-rows-[auto_1fr] h-full rounded-lg overflow-clip bg-blue-l5 hover:bg-blue-l4 border border-blue-l2/20 group"
    >
      <Media
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        id={post.featured_media}
        classes="w-full md:h-44 md:object-fill"
      />
      <div className="flex flex-col p-4 gap-3">
        <h2
          className="text-pretty group-has-[:hover]:text-blue-d1"
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
