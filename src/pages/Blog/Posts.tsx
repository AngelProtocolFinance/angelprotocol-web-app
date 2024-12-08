import { posts } from "api/get/wp-posts";
import Media from "components/Media";
import Seo from "components/Seo";
import { useEffect, useState } from "react";
import {
  Link,
  type LoaderFunction,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import type { Wordpress } from "types/wordpress";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const currPage = +(url.searchParams.get("page") ?? "1");
  const [items, total] = await posts(currPage);
  const itemsPerPage = 10;

  return {
    pageNum: currPage,
    posts: items,
    nextPageNum: currPage * itemsPerPage < total ? currPage + 1 : undefined,
  } satisfies Wordpress.PostPage;
};

export function Component() {
  const [params] = useSearchParams();
  const { data, state, load } = useFetcher<Wordpress.PostPage>();
  const firstPage = useLoaderData() as Wordpress.PostPage;
  const [posts, setPosts] = useState(firstPage.posts);

  useEffect(() => {
    if (state !== "idle" || !data) return;
    setPosts((prev) => [...prev, ...data.posts]);
  }, [data, state]);

  const nextPage = data ? data.nextPageNum : firstPage.nextPageNum;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 content-start padded-container min-h-screen pb-6">
      <Seo title="Blog - Better Giving" description="Checkout the latest" />
      <h1 className="font-bold uppercase col-span-full text-2xl lg:text-3xl break-words mt-6">
        Posts
      </h1>

      <Cards posts={posts} />
      {nextPage && (
        <button
          type="button"
          className="col-span-full btn-blue rounded-full justify-self-center px-4 py-2 text-sm  mt-6"
          onClick={() => {
            const copy = new URLSearchParams(params);
            copy.set("page", nextPage.toString());
            load(`?${copy.toString()}`);
          }}
          disabled={state !== "idle"}
        >
          Load more
        </button>
      )}
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
