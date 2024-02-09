import Image from "components/Image";
import Loader from "components/Loader";
import { wpRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await fetch(`${APIs.wp}/posts`);
    if (!res.ok) {
      return;
    }
    const postsData = await res.json();
    await postsData.forEach(async (post) => {
      if (!post.jetpack_featured_media_url) {
        post.jetpack_featured_media_url = "/images/placeholder-banner.png";
      }
    });
    setPosts(postsData);
  };

  // called on page load
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className="w-full grid content-start pb-16">
      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <div className="padded-container justify-items-center lg:content-start text-gray">
          <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            Headless WP Posts
          </h1>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {posts ? (
              posts.map((post, _index) => (
                <div
                  className="relative overflow-clip rounded-lg border border-prim hover:border-blue dark:hover:border-blue"
                  key={post.slug}
                >
                  <Link
                    to={`${wpRoutes.blog}/${post.slug}`}
                    className="grid grid-rows-[auto_1fr] h-full"
                  >
                    <Image
                      className="rounded-lg p-[5px]"
                      src={post.jetpack_featured_media_url}
                    />
                    <div className="flex flex-col p-3 pb-4 gap-3">
                      <h2 className="text-ellipsis line-clamp-2 text-blue">
                        {post.title.rendered}
                      </h2>
                      <p
                        className="justify text-gray-d1 dark:text-gray text-md -mt-2"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
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
