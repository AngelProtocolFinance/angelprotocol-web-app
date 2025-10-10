import { wp } from "api/wp";
import { Media } from "components/media";
import { metas } from "helpers/seo";
import { ChevronLeft } from "lucide-react";
import { Link, href } from "react-router";
import use_swr from "swr/immutable";
import type { IMedia, IPost, IUser } from "types/wordpress";
import type { Route } from "./+types/post";

const container_style = "w-full px-5 max-w-4xl mx-auto pb-4";

interface IPostDetailed extends IPost {
  media: IMedia;
  authorName: string;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const [post] = await wp((x, p) => {
    x.pathname = p("posts");
    x.searchParams.set("slug", params.slug);
    return x;
  }).then<IPost[]>((res) => res.json());

  if (!post) throw new Response("Not Found", { status: 404 });

  const media = await wp((x, p) => {
    x.pathname = p(`media/${post.featured_media}`);
    return x;
  }).then<IMedia>((res) => res.json());

  const author = await wp((x, p) => {
    x.pathname = p(`users/${post.author}`);
    return x;
  }).then<IUser>((res) => res.json());

  return { ...post, media, authorName: author.name } satisfies IPostDetailed;
};

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  return metas({ title: d.slug });
};

export { ErrorBoundary } from "components/error";

export default function Post({ loaderData: post }: Route.ComponentProps) {
  return (
    <div className={container_style}>
      <Link
        to={href("/blog")}
        className="flex items-center gap-2 font-medium text-blue-d1 hover:text-blue mt-6"
      >
        <ChevronLeft className="text-[1em]" />
        <span>Go Back</span>
      </Link>
      <Loaded {...post} />
    </div>
  );
}

function Loaded(post: IPost) {
  return (
    <>
      <Media
        id={post.featured_media}
        sizes="(min-width: 896px) 896px, 100vw"
        classes="relative w-full object-cover object-top mt-4 rounded-lg"
      />
      <h1
        className="text-xl md:text-2xl lg:text-3xl my-8 text-pretty"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p className="text-sm mt-8 text-gray">
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
        className="prose lg:prose-lg prose-a:text-blue hover:prose-a:text-blue-d1"
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </>
  );
}

function Author(props: { id: number }) {
  const { data } = use_swr(`users/${props.id}`, async (path) => {
    return wp((x, p) => {
      x.pathname = p(path);
      return x;
    }).then<IUser | null>((res) => (res.ok ? res.json() : null));
  });
  return data && <p className="text-gray text-sm">Author: {data.name}</p>;
}
