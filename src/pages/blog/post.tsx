import { wp } from "api/api";
import { Media } from "components/media";
import { metas } from "helpers/seo";
import { ChevronLeft } from "lucide-react";
import { Link, type LoaderFunctionArgs, href } from "react-router";
import use_swr from "swr/immutable";
import type { IMedia, IPost, IUser } from "types/wordpress";
import type { Route } from "./+types/post";

const containerStyle = "w-full px-5 max-w-4xl mx-auto pb-4";

interface IPostDetailed extends IPost {
  media: IMedia;
  authorName: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [post] = await wp.get<IPost[]>(`posts?slug=${params.slug}`).json();

  if (!post) throw new Response("Not Found", { status: 404 });

  const media = wp.get<IMedia>(`media/${post.featured_media}`).json();
  const author = wp.get<IUser>(`users/${post.author}`).json();
  const [m, a] = await Promise.all([media, author]);
  return { ...post, media: m, authorName: a.name } satisfies IPostDetailed;
};

export const meta: Route.MetaFunction = ({ loaderData: d }) => {
  if (!d) return [];
  return metas({ title: d.slug });
};

export { ErrorBoundary } from "components/error";

export default function Post({ loaderData: post }: Route.ComponentProps) {
  return (
    <div className={containerStyle}>
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
  const { data } = use_swr(`users/${props.id}`, (path) =>
    wp.get<IUser>(path).json()
  );
  return data && <p className="text-gray text-sm">Author: {data.name}</p>;
}
