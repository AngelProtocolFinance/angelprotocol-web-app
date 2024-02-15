import Image from "components/Image";
import Loader from "components/Loader";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pages() {
  const [pages, setPages] = useState([]);

  const loadPages = async () => {
    const res = await fetch(`${APIs.wp}/pages`);
    if (!res.ok) {
      return;
    }
    const pagesData = await res.json();
    await pagesData.forEach(async (page) => {
      if (!page.jetpack_featured_media_url) {
        page.jetpack_featured_media_url = "/images/placeholder-banner.png";
      }
    });
    setPages(pagesData);
  };

  // called on page load
  useEffect(() => {
    loadPages();
  }, []);
  return (
    <div className="w-full grid content-start pb-16">
      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <div className="padded-container justify-items-center lg:content-start text-gray">
          <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            Headless WP Pages
          </h1>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {pages ? (
              pages.map((page, _index) => (
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
                        dangerouslySetInnerHTML={{
                          __html: page.excerpt.rendered,
                        }}
                      ></p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <Loader
                bgColorClass="bg-blue"
                gapClass="gap-2"
                widthClass="w-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
