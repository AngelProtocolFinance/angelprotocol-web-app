import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import Media from "components/Media";
import QueryLoader from "components/QueryLoader";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePostQuery, useUserQuery } from "services/wordpress";
import type { Wordpress } from "types/wordpress";

const containerStyle = "w-full padded-container max-w-4xl mx-auto pb-4";

const wpStyles = [
  "animate.min.css",
  "bootstrap.min.css",
  "bootstrap.rtl.min.css",
  "custom-animation.css",
  "fontawesome.min.css",
  "gainioz-core.css",
  "gainioz-custom.css",
  "gainioz-unit.css",
  "magnific-popup.css",
  "meanmenu.css",
  "nice-select.css",
  "swiper-bundle.css",
];

export default function Post() {
  const { slug = "" } = useParams<{ slug: string }>();

  const query = usePostQuery(slug, { skip: !slug });

  return (
    <div className={containerStyle}>
      <Helmet
        link={wpStyles.map((w) => ({
          rel: "stylesheet",
          type: "text/css",
          href: `/wordpress/${w}`,
        }))}
      />

      <Link
        to={".."}
        className="flex items-center gap-2 font-medium text-blue-d1 hover:text-blue mt-6"
      >
        <Icon type="ChevronLeft" className="text-[1em]" />
        <span>Go Back</span>
      </Link>
      <QueryLoader
        queryState={query}
        messages={{
          loading: <Skeleton />,
        }}
        classes={{ container: containerStyle }}
      >
        {(post) => <Loaded {...post} />}
      </QueryLoader>
    </div>
  );
}

function Loaded(post: Wordpress.Post) {
  return (
    <>
      <Media
        sizes="(min-width: 896px) 896px, 100vw"
        id={post.featured_media}
        classes="relative w-full object-cover object-top mt-4 rounded-lg"
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
        //biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </>
  );
}

function Author(props: { id: number }) {
  const { data } = useUserQuery(props.id);
  return data && <p className="text-navy-l1 text-sm">Author: {data.name}</p>;
}

function Skeleton() {
  return (
    <>
      <ContentLoader className="h-60 w-full mt-4" />
      <ContentLoader className="h-12 w-[90%] mt-4" />
      <ContentLoader className="h-4 w-40 mt-4" />
      <ContentLoader className="h-4 w-40 mt-2" />

      <ContentLoader className="h-4 w-full mt-8" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />

      <ContentLoader className="h-4 w-full mt-8" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />

      <ContentLoader className="h-4 w-full mt-8" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />
      <ContentLoader className="h-4 w-full mt-2" />
    </>
  );
}
