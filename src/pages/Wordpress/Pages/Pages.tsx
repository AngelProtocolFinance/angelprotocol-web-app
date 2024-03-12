import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { usePagesQuery } from "services/wordpress";

export default function Pages() {
  const { data: pages, isLoading, isError } = usePagesQuery({});

  if (isLoading) return <p>loading...TODO: make skeleton for this</p>;
  if (isError || !pages) return <p>error loading pages</p>;

  return (
    <div className="w-full grid content-start pb-16">
      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <div className="padded-container justify-items-center lg:content-start text-gray">
          <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            Headless WP Pages
          </h1>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {pages.map((page, _index) => (
              <div
                className="relative overflow-clip rounded-lg border border-prim hover:border-blue dark:hover:border-blue"
                key={page.id}
              >
                <Link
                  to={`${appRoutes.blog}/${page.slug}`}
                  className="grid grid-rows-[auto_1fr] h-full"
                >
                  <Image
                    className="rounded-lg p-[5px]"
                    src={page.jetpack_featured_media_url}
                  />
                  <div className="flex flex-col p-3 pb-4 gap-3">
                    <h2 className="text-ellipsis line-clamp-2 text-blue">
                      {page.title.rendered}
                    </h2>
                    <p
                      className="justify text-gray-d1 dark:text-gray text-md -mt-2"
                      // biome-ignore lint: TODO: any other method to set this
                      dangerouslySetInnerHTML={{
                        __html: page.excerpt.rendered,
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
